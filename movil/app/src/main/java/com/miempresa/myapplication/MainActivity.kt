package com.miempresa.myapplication

import android.os.Bundle
import android.os.StrictMode
import androidx.appcompat.app.AlertDialog

import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentTransaction

import com.auth0.android.jwt.JWT
import com.miempresa.myapplication.databinding.ActivityMainBinding

import com.miempresa.myapplication.ui.autohome.AutoHome
import com.miempresa.myapplication.ui.historial.Historial
import com.miempresa.myapplication.ui.taller.Taller
import com.miempresa.myapplication.ui.telemetria.Telemetria
import kotlinx.android.synthetic.main.activity_main.*



class MainActivity : AppCompatActivity() {

    private lateinit var binding : ActivityMainBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        replaceFragment(AutoHome())

        val policy =
            StrictMode.ThreadPolicy.Builder().permitAll().build()
        StrictMode.setThreadPolicy(policy)

        val JWTtoken = intent.getStringExtra("JWTtoken").toString()
        var jwt: JWT = JWT(JWTtoken)
        val user_id = jwt.getClaim("id").asInt()
        val user_name = jwt.getClaim("name").asString().toString()
        val user_email = jwt.getClaim("email").asString().toString()
        val user_celular = jwt.getClaim("celular").asInt().toString()
        //user_imagen = jwt.getClaim("imagen").asInt().toString()
        alertSuccess("Hola $user_name con email: $user_email ")

        val fragment = AutoHome()
        val args = Bundle()
        args.putString("name",user_name)
        fragment.arguments = args
        supportFragmentManager.beginTransaction().replace(R.id.mainContainer, fragment)
        .commit()

        binding.navView.setOnItemSelectedListener {
            when(it.itemId){
                R.id.navigation_autohome -> replaceFragment(AutoHome())
                R.id.navigation_taller -> replaceFragment(Taller())
                R.id.navigation_historial -> replaceFragment(Historial())
                R.id.navigation_telemetria -> replaceFragment(Telemetria())
                else ->{

                }
            }
            true
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

    private fun replaceFragment(fragment: Fragment){
        val fragmentManager = supportFragmentManager
        val fragmentTransaction = fragmentManager.beginTransaction()
        fragmentTransaction.replace(R.id.mainContainer,fragment)
        fragmentTransaction.commit()
    }
}
