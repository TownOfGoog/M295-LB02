# Name des Projektes: M295-LB02 To-Do-List Backend

# Ersteller: Yanik Perez




Endpunkte: 
GET     /tasks              zeigt alle tasks an
POST    /tasks             fügt einen task hinzu mit den daten aus dem body. Das JSON muss {"title":"irgendwas"}beinhalten
GET     /tasks/{id}         zeigt einen speziefischen task an
PUT     /tasks/{id}         verändert einen task. Das JSON im Body muss {"title":"irgendwas"}beinhalten
DELETE  /tasks/{id}         löscht einen task
POST    /login              logt ein wenn man das richtige passwort ("m295") und eine email im body als JSON hat
                            das JSON im body muss die Atribute "email" und "passwort" haben
GET     /verify             verifiziert das login
DELETE  /logout             logt aus

für alle funktionen ausser login muss man eingelogt sein