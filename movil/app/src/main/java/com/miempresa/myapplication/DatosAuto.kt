package com.miempresa.myapplication

import android.content.Intent
import android.os.AsyncTask
import android.os.Bundle
import android.os.StrictMode
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import coil.load
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.miempresa.myapplication.models.ErroresData
import kotlinx.android.synthetic.main.activity_datos_auto.*
import org.json.JSONException


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

        addError.setOnClickListener{
            val intent = Intent (this, ErrorAdd::class.java)
            intent.putExtra("idvehiculo",idvehiculo.toString())
            startActivity(intent)
        }

        listaErr.addItemDecoration(DividerItemDecoration(this, DividerItemDecoration.VERTICAL))
        listaErr.layoutManager = LinearLayoutManager(this)
        var llenarLista = ArrayList<ErroresData>()
        AsyncTask.execute {
            val queue = Volley.newRequestQueue(this )
            val url = getString(R.string.urlAPI) + "/errormanual/" + idvehiculo
            val stringRequest = JsonArrayRequest(url,
                Response.Listener { response ->
                    try {
                        for (i in 0 until response.length()) {
                            val auto =
                                response.getJSONObject(i).getString("auto")
                            val id =
                                response.getJSONObject(i).getString("id")
                            val rma_descripcion =
                                response.getJSONObject(i).getString("rma_descripcion")
                            val rma_fecha =
                                response.getJSONObject(i).getString("rma_fecha")
                            val rma_fecmodificacion =
                                response.getJSONObject(i).getString("rma_fecmodificacion")
                            val rma_fecregistro =
                                response.getJSONObject(i).getString("rma_fecregistro")
                            val rma_hora =
                                response.getJSONObject(i).getString("rma_hora")
                            val rma_nombre =
                                response.getJSONObject(i).getString("rma_nombre")
                            llenarLista.add(ErroresData(
                                auto.toInt(), id.toInt(), rma_descripcion, rma_fecha, rma_fecmodificacion, rma_fecregistro, rma_hora, rma_nombre))
                        }
                        val adapter = AdaptadorErrores(llenarLista)
                        listaErr.adapter = adapter


                    } catch (e: JSONException) {
                        alertFail("Error al obtener los datos")
                    }
                }, Response.ErrorListener {
                    alertFail("Error en la conexion")
                })
            queue.add(stringRequest)
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

    private fun alertSuccess(s: String) {
        val alertDialogBuilder = AlertDialog.Builder(this)
            .setTitle("Felicidades")
            .setIcon(R.drawable.ic_baseline_check_24)
            .setMessage(s)
            .setPositiveButton("OK", { dialog, whichButton ->
                dialog.dismiss()
            })
            .show()
    }


    private fun alertFail(s: String) {
        val alertDialogBuilder = AlertDialog.Builder(this)
            .setTitle("Error")
            .setIcon(R.drawable.ic_baseline_warning_24)
            .setMessage(s)
            .setPositiveButton("OK", { dialog, whichButton ->
                dialog.dismiss()
            })
            .show()
    }

}