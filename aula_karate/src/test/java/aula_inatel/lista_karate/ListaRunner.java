package aula_inatel.lista_karate;

import com.intuit.karate.junit5.Karate;

class ListaRunner {

    @Karate.Test
    Karate testLista() {
        return Karate.run("lista_karate").relativeTo(getClass());
    }

}