package com.miempresa.myapplication

import android.content.Intent
import android.os.AsyncTask
import android.os.Bundle
import android.os.StrictMode
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import coil.load
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import kotlinx.android.synthetic.main.activity_datos_auto.*


class DatosAuto : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_datos_auto)
        this.setTitle("Datos del vehículo");
        val policy =
            StrictMode.ThreadPolicy.Builder().permitAll().build()
        StrictMode.setThreadPolicy(policy)


        val bundle :Bundle ?=intent.extras

        val idvehiculo = bundle?.getString("id").toString()
        autoModelo.setText(bundle?.getString("modelo").toString())
        autoMarca.setText(bundle?.getString("marca").toString())
        val imagenVehiculo = bundle?.getString("imagen").toString()
        autoPlaca.setText(bundle?.getString("placa").toString())
        autoColor.setText(bundle?.getString("color").toString())
        autoFecAd.setText(bundle?.getString("fecAd").toString())
        autoDescripcion.setText(bundle?.getString("descripcion").toString())
        carImage.load(imagenVehiculo)


        eliminarBtn.setOnClickListener(){
            alertEliminar("¿Estás seguro que quieres eliminar este vehiculo?",idvehiculo)
        }

    }

    private fun alertEliminar(s: String, idvehiculo:String) {
        val alertDialogBuilder = AlertDialog.Builder(this)
            .setTitle("Eliminar vehículo")
            .setMessage(s)
            .setPositiveButton("Si", { dialog, whichButton ->
                eliminarVehiculo(idvehiculo)
            })
            .setNegativeButton("No", { dialog, whichButton ->
                dialog.dismiss()
            })
            .show()
    }

    fun eliminarVehiculo(id:String) {
        AsyncTask.execute {
            val queue = Volley.newRequestQueue(this)
            var url = getString(R.string.urlAPI) + "/vehicles/" + id
            val postRequest: StringRequest = object : StringRequest(
                Request.Method.DELETE, url,
                Response.Listener { response -> // response

                },
                Response.ErrorListener { response ->// error

                }
            ){}
            queue.add(postRequest)
        }
        val regresar = Intent(this, MainActivity::class.java)
        startActivity(regresar)
    }

}