package com.miempresa.myapplication.models

data class SensorErrorData(
    val id: Int,
    val rer_nombre: String,
    val rer_descripcion: String,
    val rer_fecregistro: String,
    val rer_horaregistro: String,
    val registro_datos: Int,
)