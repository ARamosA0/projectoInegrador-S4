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

//        createNotificationChannel()




        replaceFragment(AutoHome())

        val policy =
            StrictMode.ThreadPolicy.Builder().permitAll().build()
        StrictMode.setThreadPolicy(policy)




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

    /*
    private fun createNotificationChannel() {
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O){
            val importance = Noti
        }
    }

 */


    private fun replaceFragment(fragment: Fragment){
        val fragmentManager = supportFragmentManager
        val fragmentTransaction = fragmentManager.beginTransaction()
        fragmentTransaction.replace(R.id.mainContainer,fragment)
        fragmentTransaction.commit()
    }
}
