package com.miempresa.myapplication

import android.Manifest
import android.app.PendingIntent
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.os.Environment
import android.os.StrictMode
import android.util.Log
import android.widget.TextView
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.core.content.ContextCompat
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.auth0.android.jwt.JWT
import kotlinx.android.synthetic.main.activity_login.*
import org.json.JSONException
import org.json.JSONObject


class LoginActivity : AppCompatActivity() {

    var JWTtoken = ""

    override fun onCreate(savedInstanceState: Bundle?) {

        /*
        val CHANNEL_ID = "com.miempresa.myapplication"
        val intent = Intent(this, RegisterActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        }
        val pendingIntent: PendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_IMMUTABLE)
        val builder = NotificationCompat.Builder(this, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_baseline_directions_car_24)
            .setContentTitle("Ha pasado tanto desde su última revisión")
            .setContentText("No dejes el mantenimiento de tu vehículo, hazle un chequeo")
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            // Set the intent that will fire when the user taps the notification
            .setContentIntent(pendingIntent)
            .setAutoCancel(true)

        with(NotificationManagerCompat.from(this)) {
            // notificationId is a unique int for each notification that you must define
            notify(1, builder.build())
        }

         */



        Thread.sleep(1000)
        setTheme(R.style.Theme_Final)
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        supportActionBar?.hide()



        val policy =
            StrictMode.ThreadPolicy.Builder().permitAll().build()
        StrictMode.setThreadPolicy(policy)



        ActividadSignUp.setOnClickListener(){
            val intent = Intent(this, RegisterActivity::class.java)
            startActivity(intent)
        }


        btnLogin.setOnClickListener(){
            val email = userEmaileditLog.text.toString()
            val pass =  userPasswordeditLog.text.toString()

            if(email.isEmpty()){
                userEmaileditLog.error = "Email required"
                userEmaileditLog.requestFocus()
                return@setOnClickListener
            }
            if(pass.isEmpty()){
                userPasswordeditLog.error = "Password required"
                userPasswordeditLog.requestFocus()
                return@setOnClickListener
            }

            else{
                val queue = Volley.newRequestQueue(this)
                val url = getString(R.string.urlAPI) + "/login/"
                val jsonObj = JSONObject()
                jsonObj.put("email", email)
                jsonObj.put("password",pass)

                val stringRequest =  JsonObjectRequest(
                    Request.Method.POST, url,jsonObj,
                    Response.Listener { response ->
                        try {
                            JWTtoken = response.getString("jwt")
                            openProfile(JWTtoken)
                        } catch (e: JSONException){
                            alertFail("Hey, estos datos no van")
                        }
                    }, Response.ErrorListener {
                        alertFail("Revisa los datos ingresados, es posible que este usuario ya esté registrado")
                    })
                queue.add(stringRequest)
            }
        }

    }
    private fun openProfile(JWTtoken: String) {
        val intent = Intent(this, MainActivity::class.java)
        var jwt: JWT = JWT(this.JWTtoken)
        val user_id = jwt.getClaim("id").asInt()
        val user_name = jwt.getClaim("name").asString().toString()
        val user_imagen = jwt.getClaim("imagen").asString().toString()
        //val user_email = jwt.getClaim("email").asString().toString()
        //val user_celular = jwt.getClaim("celular").asInt().toString()


        val datos = getSharedPreferences("DatosUsuario", MODE_PRIVATE)
        val editor = datos.edit()
        editor.putString("id",user_id.toString())
        editor.putString("user_name", user_name)
        editor.putString("user_imagen", user_imagen)
        editor.apply()
        startActivity(intent)
        finish()
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
            .setTitle("Ups! Algo salió mal")
            .setMessage(s)
            .setPositiveButton("OK", { dialog, whichButton ->
                dialog.dismiss()
            })
            .show()
    }
}