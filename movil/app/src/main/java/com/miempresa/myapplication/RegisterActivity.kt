package com.miempresa.myapplication

import android.content.Intent
import android.os.Bundle
import android.os.StrictMode
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import kotlinx.android.synthetic.main.activity_login.*
import kotlinx.android.synthetic.main.activity_register.*
import org.json.JSONObject


class RegisterActivity : AppCompatActivity() {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)
        supportActionBar?.hide()

        val policy =
            StrictMode.ThreadPolicy.Builder().permitAll().build()
        StrictMode.setThreadPolicy(policy)

        ActividadLogin.setOnClickListener(){
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)

        }

        btnRegistrarse.setOnClickListener(){
            val name = userNameeditReg.text.toString().trim()
            val email = userEmaileditReg.text.toString().trim()
            val pass = userPasswordeditReg.text.toString().trim()
            val celular = userPhoneeditReg.text.toString().trim()

            if(name.isEmpty()||email.isEmpty()||pass.isEmpty()||celular.isEmpty()) {
                alertFail("Todos los campos deben ser llenados")
                userNameeditReg.error = "Name required"
                userEmaileditReg.error = "Email required"
                userPasswordeditReg.error = "Password required"
                userPhoneeditReg.error = "Telefono required"

            }
            if(name.isEmpty()){
                userNameeditReg.error = "Se requiere nombre de usuario"
                userNameeditReg.requestFocus()
                return@setOnClickListener
            }
            if(email.isEmpty()){
                userEmaileditReg.error = "Se requiere correo electrónico"
                userEmaileditReg.requestFocus()
                return@setOnClickListener
            }
            if(pass.isEmpty()){
                userPasswordeditReg.error = "Se requiere contraseña"
                userPasswordeditReg.requestFocus()
                return@setOnClickListener
            }
            if(celular.isEmpty()){
                userPhoneeditReg.error = "Se requiere número telefónico"
                userPhoneeditReg.requestFocus()
                return@setOnClickListener
            }
            else{
                val queue = Volley.newRequestQueue(this)
                val url = getString(R.string.urlAPI) + "/register/"
                val jsonObj = JSONObject()
                jsonObj.put("name", name)
                jsonObj.put("email", email)
                jsonObj.put("password", pass)
                jsonObj.put("celular", celular)

                val stringRequest =  JsonObjectRequest(
                    Request.Method.POST, url,jsonObj,
                    Response.Listener { response ->
                        alertSuccess("Registro exitoso!")
                        sendRegister()
                    },
                    Response.ErrorListener {
                        alertFail("Usuario ya existente")
                    })
                queue.add(stringRequest)

            }

        }

    }


    fun sendRegister(){
        alertSuccess("Register is succesfully")
        val intent = Intent(this, LoginActivity::class.java)
        startActivity(intent)
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



