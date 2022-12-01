package com.miempresa.myapplication.models

data class AutoData(
    val id: Int,
    val aut_imagen: String,
    val aut_placa: String,
    val aut_modelo: String,
    val aut_descripcion: String,
    val aut_marca: String,
    val aut_color: String,
    val aut_fecadquisicion: String,
    val aut_usuario: Int
)