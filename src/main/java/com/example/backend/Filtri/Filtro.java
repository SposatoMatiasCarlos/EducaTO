package com.example.backend.Filtri;

import com.example.backend.Persistence.User;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Order(1)
public class Filtro implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest)  servletRequest;
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");

        // "Mando avanti" le preflight request
        if(request.getMethod().equals("OPTIONS")) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        String pathname = request.getServletPath();
        String method = request.getMethod();
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        // Utente loggato
        if( user != null ){

            // Operazioni di admin e moderatori
            if( (pathname.startsWith("/cartelle") ||
                 pathname.startsWith("/percorsi")) &&
                 method.equals("POST")){

                if(!(user.getRuolo().equals("admin") || user.getRuolo().equals("mod"))){
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
                    return;
                }
            }

            // Operazioni degli admin
            if(pathname.equals("/utenti/ruolo")){
                if(!user.getRuolo().equals("admin")){
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
                    return;
                }
            }

            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        // Utente non loggato
        // Può comunque leggere gli articoli o visualizzare la classifica
        // (Non può accedere alle lezioni)
        if(pathname.startsWith("/session") || pathname.startsWith("/cartelle") || pathname.equals("/utenti/classifica")){
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }


        response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        return;
    }
}
