package com.miempresa.myapplication

import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Intent
import android.os.Bundle
import android.os.StrictMode
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.fragment.app.Fragment
import com.miempresa.myapplication.databinding.ActivityMainBinding
import com.miempresa.myapplication.ui.autohome.AutoHome
import com.miempresa.myapplication.ui.historial.Historial
import com.miempresa.myapplication.ui.taller.Taller
import com.miempresa.myapplication.ui.telemetria.Telemetria


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


    private fun replaceFragment(fragment: Fragment){
        val fragmentManager = supportFragmentManager
        val fragmentTransaction = fragmentManager.beginTransaction()
        fragmentTransaction.replace(R.id.mainContainer,fragment)
        fragmentTransaction.commit()
    }
}
