<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Crea una nueva instancia del AuthController.
     * Es buena práctica proteger las rutas con el middleware 'auth:api'
     */
    public function __construct()
    {
        // Se aplica el middleware a todas las rutas EXCEPTO login y register
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function register(Request $request)
    {
        // Reglas de validación
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        try {
            // Crea el usuario
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                // Laravel hashea la contraseña automáticamente si se usa 'casts'
                'password' => Hash::make($request->password), 
            ]);

            // Intentar autenticar y generar token inmediatamente después del registro
            $token = Auth::guard('api')->attempt($request->only('email', 'password'));

            if (!$token) {
                return response()->json(['error' => 'No se pudo crear el token después del registro'], 500);
            }

            return $this->respondWithToken($token, $user);

        } catch (\Exception $e) {
            // Manejar excepciones de base de datos o cualquier otro error
            // En un entorno real, solo registrarías el error y devolverías un mensaje genérico.
            return response()->json(['error' => 'Error en el servidor al intentar registrar el usuario.', 'exception' => $e->getMessage()], 500);
        }
    }

    public function login(Request $request)
    {
        // Validar que se enviaron el email y la contraseña
        $credentials = $request->only('email', 'password');

        // Intenta generar un token usando las credenciales.
        // Auth::guard('api')->attempt() hashea la contraseña automáticamente.
        $token = Auth::guard('api')->attempt($credentials);

        if (!$token) {
            // Si las credenciales son incorrectas, devuelve un error 401
            return response()->json(['error' => 'Credenciales inválidas'], 401);
        }

        // Si es exitoso, obtenemos el usuario y respondemos con el token.
        $user = Auth::guard('api')->user();
        return $this->respondWithToken($token, $user);
    }

    public function me()
    {
        return response()->json(Auth::guard('api')->user());
    }
    
    public function logout()
    {
        Auth::guard('api')->logout();

        return response()->json(['message' => 'Sesión cerrada exitosamente']);
    }

    public function refresh()
    {
        return $this->respondWithToken(Auth::guard('api')->refresh(), Auth::guard('api')->user());
    }

    protected function respondWithToken($token, $user)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::guard('api')->factory()->getTTL() * 60, // Tiempo de vida del token en segundos
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ]
        ]);
    }
}