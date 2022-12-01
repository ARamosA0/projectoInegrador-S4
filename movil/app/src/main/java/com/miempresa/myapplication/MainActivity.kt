package com.miempresa.myapplication

import android.os.Bundle
import android.content.Intent



import android.os.StrictMode
import android.widget.AdapterView
import android.widget.ArrayAdapter
import androidx.appcompat.app.AlertDialog

import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentTransaction



import com.miempresa.myapplication.ui.autohome.AutoHome
import com.miempresa.myapplication.ui.historial.Historial
import com.miempresa.myapplication.ui.taller.Taller
import com.miempresa.myapplication.ui.telemetria.Telemetria
import kotlinx.android.synthetic.main.activity_auto_add.*
import kotlinx.android.synthetic.main.activity_main.*
import com.miempresa.myapplication.databinding.ActivityMainBinding



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

        val bundle :Bundle ?=intent.extras


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
