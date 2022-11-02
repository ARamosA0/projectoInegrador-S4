package com.miempresa.myapplication.fragments

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import com.miempresa.myapplication.AutoAdd
import com.miempresa.myapplication.databinding.FragmentAutoHomeBinding
import kotlinx.android.synthetic.main.fragment_auto_home.*

class AutoHome : Fragment() {


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {


        val bind = FragmentAutoHomeBinding.inflate(inflater, container,false)


        bind.autoAdd.setOnClickListener{
            val intent = Intent (this@AutoHome.requireContext(), AutoAdd::class.java)
            startActivity(intent)
        }
        /*
        bind.autoInfo.setOnClickListener {
            val intent2 = Intent(this@AutoHome.requireContext(), DatosAuto::class.java)
            startActivity(intent2)
        }*/
        return bind.root

    }

    private fun getUser() {
        TODO("Not yet implemented")
    }


}