package com.miempresa.myapplication

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import com.miempresa.myapplication.databinding.FragmentTelemetriaBinding

import kotlinx.android.synthetic.main.fragment_telemetria.*


class Telemetria : Fragment() {

    private var _binding: FragmentTelemetriaBinding? = null
    private val binding get() = _binding!!

    override fun onResume() {
        super.onResume()
        val autos = resources.getStringArray(R.array.autos_usuario)
        val sensores = resources.getStringArray(R.array.autos_sensores)
        val arrayAdapter = ArrayAdapter(requireContext(),R.layout.autos_usuario, autos)
        val arrayAdapter2 = ArrayAdapter(requireContext(),R.layout.autos_usuario, sensores)
        binding.autoUsuario.setAdapter(arrayAdapter)
        binding.autoSensor.setAdapter(arrayAdapter2)


    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentTelemetriaBinding.inflate(inflater, container,false)
        val view = binding.root
        return view
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

}