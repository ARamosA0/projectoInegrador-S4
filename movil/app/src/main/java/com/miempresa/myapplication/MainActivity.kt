package com.miempresa.myapplication


import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ArrayAdapter
import androidx.fragment.app.Fragment
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.miempresa.myapplication.databinding.ActivityMainBinding
import kotlinx.android.synthetic.main.activity_main.*



class MainActivity : AppCompatActivity() {


    private lateinit var binding : ActivityMainBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)



        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        replaceFragment(AutoHome())

        binding.bottomNavigation.setOnItemSelectedListener {
            when(it.itemId){
                R.id.page_1 -> replaceFragment(AutoHome())
                R.id.page_2 -> replaceFragment(Taller())
                R.id.page_3 -> replaceFragment(Historial())
                R.id.page_4 -> replaceFragment(Telemetria())
                else ->{

                }
            }
            true
        }

    }
    private fun replaceFragment(fragment: Fragment){
        val fragmentManager = supportFragmentManager
        val fragmentTransaction = fragmentManager.beginTransaction()
        fragmentTransaction.replace(R.id.FrameMain,fragment)
        fragmentTransaction.commit()
    }
}
