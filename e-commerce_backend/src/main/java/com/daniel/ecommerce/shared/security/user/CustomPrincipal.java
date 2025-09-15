package com.daniel.ecommerce.shared.security.user;

import java.io.Serializable;

//Serializable por si viaja por sesión distribuida
public record CustomPrincipal(String userId, String username) implements Serializable {
}
