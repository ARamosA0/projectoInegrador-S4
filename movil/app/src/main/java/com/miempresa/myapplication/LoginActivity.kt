package com.miempresa.myapplication

import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.os.StrictMode
import android.widget.TextView
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.auth0.android.jwt.JWT
import com.miempresa.myapplication.ui.autohome.AutoHome
import kotlinx.android.synthetic.main.activity_login.*
import org.json.JSONException
import org.json.JSONObject


class LoginActivity : AppCompatActivity() {

    var JWTtoken = ""
    var user_name = ""
    var user_email = ""
    var user_id: Int? = null
    var user_celular = ""
    var user_imagen = ""

    override fun onCreate(savedInstanceState: Bundle?) {
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
            val textView = findViewById<TextView>(R.id.userEmaileditLog)
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
                //val url = "http://10.0.2.2:8000/login/"
                val url = "http://172.23.8.68:8000/login/"
                val jsonObj = JSONObject()
                jsonObj.put("email", email)
                jsonObj.put("password",pass)

                val stringRequest =  JsonObjectRequest(
                    Request.Method.POST, url,jsonObj,
                    Response.Listener { response ->
                        try {
                            JWTtoken = response.getString("jwt")
                            openProfile()
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
    private fun openProfile(){
        val intent = Intent(this, MainActivity::class.java)
        intent.putExtra("JWTtoken", JWTtoken)
        startActivity(intent)
    }



    private fun checkJson(tk: String){
        var jwt: JWT = JWT(JWTtoken)
        user_id = jwt.getClaim("id").asInt()
        user_name = jwt.getClaim("name").asString().toString()
        user_email = jwt.getClaim("email").asString().toString()
        user_celular = jwt.getClaim("celular").asInt().toString()
        //user_imagen = jwt.getClaim("imagen").asInt().toString()

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