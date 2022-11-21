package com.miempresa.myapplication.models

data class ErroresData(
    val auto: Int,
    val id: Int,
    val rma_descripcion: String,
    val rma_fecha: String,
    val rma_fecmodificacion: String,
    val rma_fecregistro: String,
    val rma_hora: String,
    val rma_nombre: String
)