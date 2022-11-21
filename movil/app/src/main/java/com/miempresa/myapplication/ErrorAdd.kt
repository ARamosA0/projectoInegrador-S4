package com.miempresa.myapplication

import android.app.DatePickerDialog
import android.app.TimePickerDialog
import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.DatePicker
import android.widget.TimePicker
import androidx.appcompat.app.AlertDialog
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import kotlinx.android.synthetic.main.activity_error_add.*
import org.json.JSONException
import org.json.JSONObject
import java.text.SimpleDateFormat
import java.util.*

class ErrorAdd : AppCompatActivity() {

    var cal = Calendar.getInstance()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_error_add)

        val dateSetListener = object : DatePickerDialog.OnDateSetListener {
            override fun onDateSet(view: DatePicker, year: Int, monthOfYear: Int,
                                   dayOfMonth: Int) {
                cal.set(Calendar.YEAR, year)
                cal.set(Calendar.MONTH, monthOfYear)
                cal.set(Calendar.DAY_OF_MONTH, dayOfMonth)
                updateDateInView()
            }
        }

        getErrorDate.setOnClickListener(object : View.OnClickListener {
            override fun onClick(view: View) {
                DatePickerDialog(this@ErrorAdd,
                    dateSetListener,
                    // set DatePickerDialog to point to today's date when it loads up
                    cal.get(Calendar.YEAR),
                    cal.get(Calendar.MONTH),
                    cal.get(Calendar.DAY_OF_MONTH)).show()
            }

        })

        val mTimePicker: TimePickerDialog
        val mcurrentTime = Calendar.getInstance()
        val hour = mcurrentTime.get(Calendar.HOUR_OF_DAY)
        val minute = mcurrentTime.get(Calendar.MINUTE)

        mTimePicker = TimePickerDialog(this, object : TimePickerDialog.OnTimeSetListener {
            override fun onTimeSet(view: TimePicker?, hourOfDay: Int, minute: Int) {
                errorHoraAdd.setText(String.format("%d:%d", hourOfDay, minute))
            }
        }, hour, minute, false)

        getErrorHour.setOnClickListener({ v ->
            mTimePicker.show()
        })

        val datosAuto = getSharedPreferences("IdAuto", Context.MODE_PRIVATE)
        val auto = datosAuto?.getString("id", "id de auto").toString()
        errorDescAdd.setText(auto)

        rgError.setOnClickListener(){
            val nombre = errorNombreAdd.text.toString().trim()
            val hora = errorHoraAdd.text.toString().trim()
            val fecha = errorFechaAdd.text.toString().trim()
            val descripcion = errorDescAdd.text.toString().trim()

            if (nombre.isEmpty() || hora.isEmpty() || fecha.isEmpty() || descripcion.isEmpty()) {
                alertFail("Todos los campos deben ser completados")
                errorNombreAdd.error = "Se requiere un título"
                errorHoraAdd.error = "Se requiere una hora"
                errorFechaAdd.error = "Se requiere una fecha"
                errorDescAdd.error = "Se requiere una descripción"


            } else{
                val queue = Volley.newRequestQueue(this)
                val url = getString(R.string.urlAPI) + "/errmanual/"
                val jsonObj = JSONObject()
                jsonObj.put("rma_nombre", nombre)
                jsonObj.put("rma_hora", hora)
                jsonObj.put("rma_fecha", fecha)
                jsonObj.put("auto", auto)
                jsonObj.put("rma_descripcion", descripcion)

                val stringRequest = JsonObjectRequest(
                    Request.Method.POST, url,jsonObj,
                    Response.Listener { response ->
                        try {
                            alertSuccess("El error ha sido registrado!")
                        } catch (e: JSONException){
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
        errorFechaAdd.setText(sdf.format(cal.getTime()))
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