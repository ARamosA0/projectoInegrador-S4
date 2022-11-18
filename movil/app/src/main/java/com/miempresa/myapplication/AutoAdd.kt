package com.miempresa.myapplication

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.StrictMode
import android.widget.Button
import android.widget.ImageView
import androidx.appcompat.app.AlertDialog
import androidx.activity.result.PickVisualMediaRequest
import androidx.activity.result.contract.ActivityResultContracts.*
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import kotlinx.android.synthetic.main.activity_auto_add.*
import org.json.JSONException
import org.json.JSONObject


class AutoAdd : AppCompatActivity() {

    val pickMedia = registerForActivityResult(PickVisualMedia()){ uri ->
        if (uri!=null){
            //imagen
            ivImage.setImageURI(uri)
        }else{
            //no imagen
        }

    }
    lateinit var  btnImagen: Button
    lateinit var ivImage: ImageView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_auto_add)

        btnImagen = findViewById(R.id.btnImagen)
        ivImage = findViewById(R.id.ivImage)
        btnImagen.setOnClickListener{
            //val git = "image/gif"
            if (PickVisualMedia.isPhotoPickerAvailable())
                pickMedia.launch(PickVisualMediaRequest(PickVisualMedia.ImageOnly))
        }


        this.setTitle("Agregar vehiculo");

        val policy =
            StrictMode.ThreadPolicy.Builder().permitAll().build()
        StrictMode.setThreadPolicy(policy)

        val datos = getSharedPreferences("DatosUsuario", Context.MODE_PRIVATE)
        val userId = datos?.getString("id", "id de usuario").toString()

        val bundle :Bundle ?=intent.extras
        val imagen = bundle?.getString("imagen").toString()
        if(bundle!=null){
            autoModeloAdd.setText(bundle.getString("modelo").toString())
            autoMarcaAdd.setText(bundle.getString("marca").toString())
            autoPlacaAdd.setText(bundle.getString("placa").toString())
            auto_color.setText(bundle.getString("color").toString())
            autoAdqfecAdd.setText(bundle.getString("fecAd").toString())
            autoDescAdd.setText(bundle.getString("descripcion").toString())

            rgAuto.setEnabled(false)
            modAuto.setEnabled(true)
        } else{
            rgAuto.setEnabled(true)
            modAuto.setEnabled(false)
        }



        rgAuto.setOnClickListener() {
            val marca = autoMarcaAdd.text.toString().trim()
            val modelo = autoModeloAdd.text.toString().trim()
            val numero_placa = autoPlacaAdd.text.toString().trim()
            val color = auto_color.text.toString().trim()
            val descripcion = autoDescAdd.text.toString().trim()
            val año_adquision = autoAdqfecAdd.text.toString().trim()

            if (marca.isEmpty() || modelo.isEmpty() || numero_placa.isEmpty() || color.isEmpty() ||descripcion.isEmpty() || año_adquision.isEmpty()) {
                alertFail("Todos los campos deben ser llenados")
                autoMarcaAdd.error = "Marca required"
                autoModeloAdd.error = "Modelo required"
                autoPlacaAdd.error = "Placa required"
                auto_color.error = "Kilometraje required"
                autoAdqfecAdd.error = "Año_adquisicion required"
                autoDescAdd.error = "Descripcion required"


            }
            if (marca.isEmpty()) {
                autoMarcaAdd.error = "Se requiere marca del vehiculo"
                autoMarcaAdd.requestFocus()
                return@setOnClickListener
            }
            if (modelo.isEmpty()) {
                autoModeloAdd.error = "Se requiere modelo de auto"
                autoModeloAdd.requestFocus()
                return@setOnClickListener
            }
            if (numero_placa.isEmpty()) {
                autoPlacaAdd.error = "Se requiere numero de placa"
                autoPlacaAdd.requestFocus()
                return@setOnClickListener
            }
            if (color.isEmpty()) {
                auto_color.error = "Se requiere color"
                auto_color.requestFocus()
                return@setOnClickListener
            }

            if (descripcion.isEmpty()) {
                autoDescAdd.error = "Se requiere descripcion"
                autoDescAdd.requestFocus()
                return@setOnClickListener
            }
            if (año_adquision.isEmpty()) {
                autoAdqfecAdd.error = "Se requiere año de adquision"
                autoAdqfecAdd.requestFocus()
                return@setOnClickListener
            } else {
                val queue = Volley.newRequestQueue(this)
                val url = getString(R.string.urlAPI) + "/vehicles/"
                val jsonObj = JSONObject()
                jsonObj.put("aut_marca", marca)
                jsonObj.put("aut_modelo", modelo)
                jsonObj.put("aut_placa", numero_placa)
                jsonObj.put("aut_usuario", userId)
                jsonObj.put("aut_imagen", "https://i.ytimg.com/vi/PoN2brATJKk/hqdefault.jpg")
                //  jsonObj.put("kilometraje", kilometraje)
                jsonObj.put("aut_descripcion", descripcion)
                jsonObj.put("aut_color", color)
                jsonObj.put("aut_fecadquisicion", año_adquision)

                val stringRequest = JsonObjectRequest(
                    Request.Method.POST, url,jsonObj,
                    Response.Listener { response ->
                        try {
                            alertSuccess("El vehiculo ha sido registrado!")
                        } catch (e: JSONException){
                            alertFail("Hey, estos datos no van")
                        }
                    }, Response.ErrorListener {
                        alertFail("Revisa tu conexion a internet")
                    })
                queue.add(stringRequest)

            }

        }

        modAuto.setOnClickListener() {
            val marca = autoMarcaAdd.text.toString().trim()
            val modelo = autoModeloAdd.text.toString().trim()
            val numero_placa = autoPlacaAdd.text.toString().trim()
            val color = auto_color.text.toString().trim()
            val descripcion = autoDescAdd.text.toString().trim()
            val año_adquision = autoAdqfecAdd.text.toString().trim()

            if (marca.isEmpty() || modelo.isEmpty() || numero_placa.isEmpty() || color.isEmpty() || descripcion.isEmpty() || año_adquision.isEmpty()) {
                alertFail("Todos los campos deben ser llenados")
                autoMarcaAdd.error = "Marca required"
                autoModeloAdd.error = "Modelo required"
                autoPlacaAdd.error = "Placa required"
                auto_color.error = "Kilometraje required"
                autoAdqfecAdd.error = "Año_adquisicion required"
                autoDescAdd.error = "Descripcion required"


            }
            if (marca.isEmpty()) {
                autoMarcaAdd.error = "Se requiere marca del vehiculo"
                autoMarcaAdd.requestFocus()
                return@setOnClickListener
            }
            if (modelo.isEmpty()) {
                autoModeloAdd.error = "Se requiere modelo de auto"
                autoModeloAdd.requestFocus()
                return@setOnClickListener
            }
            if (numero_placa.isEmpty()) {
                autoPlacaAdd.error = "Se requiere numero de placa"
                autoPlacaAdd.requestFocus()
                return@setOnClickListener
            }
            if (color.isEmpty()) {
                auto_color.error = "Se requiere color"
                auto_color.requestFocus()
                return@setOnClickListener
            }

            if (descripcion.isEmpty()) {
                autoDescAdd.error = "Se requiere descripcion"
                autoDescAdd.requestFocus()
                return@setOnClickListener
            }
            if (año_adquision.isEmpty()) {
                autoAdqfecAdd.error = "Se requiere año de adquision"
                autoAdqfecAdd.requestFocus()
                return@setOnClickListener
            } else {
                val queue = Volley.newRequestQueue(this)
                val url = getString(R.string.urlAPI) + "/vehicles/" + userId
                val jsonObj = JSONObject()
                jsonObj.put("aut_marca", marca)
                jsonObj.put("aut_modelo", modelo)
                jsonObj.put("aut_placa", numero_placa)
                jsonObj.put("aut_usuario", userId)
                jsonObj.put("aut_imagen", imagen)
                jsonObj.put("aut_descripcion", descripcion)
                jsonObj.put("aut_color", color)
                jsonObj.put("aut_fecadquisicion", año_adquision)

                val stringRequest = JsonObjectRequest(
                    Request.Method.PUT, url, jsonObj,
                    Response.Listener { response ->
                        try {
                            alertSuccess("Los datos del vehiculo ha sido actualizados!")
                        } catch (e: JSONException) {
                            alertFail("Hey, estos datos no van")
                        }
                    }, Response.ErrorListener {
                        alertFail("Revisa tu conexion a internet")
                    })
                queue.add(stringRequest)

            }
        }


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