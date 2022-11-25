package com.miempresa.myapplication

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.google.android.gms.maps.GoogleMap
import com.google.android.libraries.places.api.Places
import com.google.android.libraries.places.api.model.Place
import com.google.android.libraries.places.widget.Autocomplete
import com.google.android.libraries.places.widget.model.AutocompleteActivityMode
import com.miempresa.myapplication.databinding.ActivityMapaBinding
import kotlinx.android.synthetic.main.activity_tallerrr.*

class tallerrr : AppCompatActivity() {
    companion object {
        const val REQUEST_CODE_AUTOCOMPLETE_FROM = 1
        const val REQUEST_CODE_AUTOCOMPLETE_TO = 2
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_tallerrr
        )
        Places.initialize(applicationContext,getString(R.string.android_sdk_places_api_key))
        btmFrom.setOnClickListener {
            startautocomplte(REQUEST_CODE_AUTOCOMPLETE_FROM)
        }
        btnto.setOnClickListener {
            startautocomplte(REQUEST_CODE_AUTOCOMPLETE_TO)
        }
    }
        private fun startautocomplte(requestCode: Int){
            val fields = listOf(Place.Field.ID, Place.Field.NAME)

            val intent = Autocomplete.IntentBuilder(AutocompleteActivityMode.FULLSCREEN, fields)
                .build(this)

            startActivityForResult(intent, requestCode)
        }

    }
