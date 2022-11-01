package com.miempresa.myapplication.models

import com.auth0.android.jwt.JWT

data class UserData(val idToken: String?= null) {
    var celular = ""
    var email = ""
    var exp = null
    var iat = null
    var id: Int? = null
    var name = ""

    init {
        try {
            val jwt = JWT(idToken ?: "")
            id = (jwt.subject ?: "") as Int?
            name = jwt.getClaim("name").asString() ?: ""
            email = jwt.getClaim("email").asString() ?: ""
            celular =jwt.getClaim("celular").asString() ?: ""


        } catch (e: com.auth0.android.jwt.DecodeException){

        }

    }
}

