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
import com.android.volley.toolbox.Volley
import com.auth0.android.jwt.Claim
import com.auth0.android.jwt.JWT
import kotlinx.android.synthetic.main.activity_login.*
import kotlinx.android.synthetic.main.activity_login.textView
import kotlinx.android.synthetic.main.activity_register.*
import org.json.JSONObject
import java.util.*


class LoginActivity : AppCompatActivity() {

    var JWTtoken = ""
    var user_name = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        Thread.sleep(1000)
        setTheme(R.style.Theme_Final)
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

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
                val url = "http://10.0.2.2:8000/login/"
                //val url = "http://192.168.1.8:8000/login/"
                val jsonObj = JSONObject()
                jsonObj.put("email", email)
                jsonObj.put("password",pass)

                val stringRequest =  JsonObjectRequest(
                    Request.Method.POST, url,jsonObj,
                    Response.Listener { response ->
                        JWTtoken = response.getString("jwt")
                        checkJson(JWTtoken)
                        alertSuccess("Hola $user_name")
                        openProfile()
                    },
                    Response.ErrorListener {
                        alertFail("Usuario no existente")
                    })
                queue.add(stringRequest)
            }
        }




    }
    private fun openProfile(){
        val intent = Intent(this, MainActivity::class.java)
        intent.putExtra("user_name", user_name)
        startActivity(intent)
    }


    private fun checkJson(tk: String){
        var jwt: JWT = JWT(JWTtoken)
        var claim = jwt.getClaim("name").asString()
        var claim2 = jwt.getClaim("id").asString()
        user_name = claim.toString()
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