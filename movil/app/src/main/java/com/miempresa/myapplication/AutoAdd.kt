package com.miempresa.myapplication

import android.content.Context
import android.content.Intent
import android.database.Cursor
import android.net.Uri
import android.os.Bundle
import android.view.View
import android.os.StrictMode
import android.provider.MediaStore
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import kotlinx.android.synthetic.main.activity_auto_add.*
import org.json.JSONException
import org.json.JSONObject
import android.app.DatePickerDialog
import android.util.AttributeSet
import android.widget.DatePicker
import java.text.SimpleDateFormat
import java.util.*

class AutoAdd : AppCompatActivity() {

    var cal = Calendar.getInstance()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_auto_add)

        autoModeloAdd.setText(autoModeloAdd.text)

        btnImagen.setOnClickListener(){
            cargarImagen()
        }

        val dateSetListener = object : DatePickerDialog.OnDateSetListener {
            override fun onDateSet(view: DatePicker, year: Int, monthOfYear: Int,
                                   dayOfMonth: Int) {
                cal.set(Calendar.YEAR, year)
                cal.set(Calendar.MONTH, monthOfYear)
                cal.set(Calendar.DAY_OF_MONTH, dayOfMonth)
                updateDateInView()
            }
        }

        getDate.setOnClickListener(object : View.OnClickListener {
            override fun onClick(view: View) {
                DatePickerDialog(this@AutoAdd,
                    dateSetListener,
                    // set DatePickerDialog to point to today's date when it loads up
                    cal.get(Calendar.YEAR),
                    cal.get(Calendar.MONTH),
                    cal.get(Calendar.DAY_OF_MONTH)).show()
            }

        })

        val policy =
            StrictMode.ThreadPolicy.Builder().permitAll().build()
        StrictMode.setThreadPolicy(policy)

        val datos = getSharedPreferences("DatosUsuario", Context.MODE_PRIVATE)
        val userId = datos?.getString("id", "id de usuario").toString()

        val bundle :Bundle ?=intent.extras
        val imagen = bundle?.getString("imagen").toString()
        val idAuto = bundle?.getString("id").toString()




        if(bundle!=null){
            this.setTitle("Modificar vehiculo");
            autoModeloAdd.setText(bundle.getString("modelo").toString())
            autoMarcaAdd.setText(bundle.getString("marca").toString())
            autoPlacaAdd.setText(bundle.getString("placa").toString())
            auto_color.setText(bundle.getString("color").toString())
            autoAdqfecAdd.setText(bundle.getString("fecAd").toString())
            autoDescAdd.setText(bundle.getString("descripcion").toString())

            rgAuto.setEnabled(false)
            modAuto.setEnabled(true)
        } else{
            this.setTitle("Agregar vehiculo");
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
                jsonObj.put("aut_imagen", "https://www.proceso.com.mx/u/fotografias/m/2021/10/18/f638x638-144597_202764_7042.jpg")
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
                val url = getString(R.string.urlAPI) + "/vehicles/" + idAuto
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

    private fun updateDateInView() {
        val myFormat = "yyy-MM-dd" // mention the format you need
        val sdf = SimpleDateFormat(myFormat, Locale.US)
        autoAdqfecAdd.setText(sdf.format(cal.getTime()))
    }

    private fun cargarImagen() {
        val intent = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
        intent.setType("image/")
        startActivityForResult(intent,1)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode== RESULT_OK && requestCode == 1){
            var imageUri: Uri? = data?.getData()
            ivImage.setImageURI(imageUri)
            val imageFile = imageUri?.let { getRealPathFromURI(it) }
            //prueba.text = imageFile.toString()
            linkImagen.setText(imageFile.toString())

        }
    }
    private fun getRealPathFromURI(selectedImageURI: Uri): Any {
        val result: String
        val cursor: Cursor? = contentResolver.query(selectedImageURI, null, null, null, null)
        if (cursor == null) { // Source is Dropbox or other similar local file path
            result = selectedImageURI.getPath().toString()
        } else {
            cursor.moveToFirst()
            val idx: Int = cursor.getColumnIndex(MediaStore.Images.ImageColumns.DATA)
            result = cursor.getString(idx)
            cursor.close()
        }
        return result
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
