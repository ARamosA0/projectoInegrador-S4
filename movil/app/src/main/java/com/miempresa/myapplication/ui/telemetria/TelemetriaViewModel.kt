package com.miempresa.myapplication.ui.telemetria

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class TelemetriaViewModel :ViewModel(){
    private val _text = MutableLiveData<String>().apply {
        value = "Telemetria"
    }
    val text: LiveData<String> = _text
}
