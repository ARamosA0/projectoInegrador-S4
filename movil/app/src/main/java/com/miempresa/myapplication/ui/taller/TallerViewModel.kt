package com.miempresa.myapplication.ui.taller

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class TallerViewModel :ViewModel(){
    private val _text = MutableLiveData<String>().apply {
        value = "Taller"
    }
    val text: LiveData<String> = _text
}
