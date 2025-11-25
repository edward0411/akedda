@extends('layouts.app')
<h1>Bienvenido a AKEDDA</h1>

@if($mensaje)
    <p>{{ $mensaje->texto }}</p>
@else
    <p>No hay mensaje en la base de datos.</p>
@endif

