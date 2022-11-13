package com.miempresa.myapplication.ui.autohome

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup

import android.widget.*
import androidx.fragment.app.FragmentTransaction
import android.widget.TextView
import com.miempresa.myapplication.AutoAdd
import com.miempresa.myapplication.R
import kotlinx.android.synthetic.main.fragment_auto_home.*


class AutoHome : Fragment() {


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view: View = inflater.inflate(R.layout.fragment_auto_home, container, false)

        var NameText = view.findViewById<TextView>(R.id.userName)
        if(arguments != null){
            val recibido = requireArguments().getString("name")
            NameText.text=recibido
        }

        var btnAgregarAuto = view.findViewById<com.google.android.material.floatingactionbutton.FloatingActionButton>(R.id.autoAdd)
        btnAgregarAuto.setOnClickListener{
            val intent = Intent (this@AutoHome.requireContext(), AutoAdd::class.java)
            startActivity(intent)
        }
        return view

    }


}



