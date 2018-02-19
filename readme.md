# Kannan luonti: 

1. MySQL-tietokanta asentuu RPI:n Rasbian-linuxilla komennolla ```sudo apt-get install mysql-server python-mysqldb```.
2. Anna kannalle root-salasana asennuksen aikana.
3. Luo tietokanta, taulu ja käyttäjä käyttämällä dashboardin sql/ -hakemiston alla olevaa create_table_and_user.sql -tiedostoa. Aja tiedosto komennolla ```mysql -u root -p < create_table_and_user.sql```

# Datan tallentaminen kantaan:

1. Asennetaan datan lukemista varten  ruuvitag-kirjasto komennolla ```pip install ruuvitag-sensor``` Mikäli asennus epäonnistuu seuraa tarkempia asennusohjeita osoitteessa: https://github.com/ttu/ruuvitag-sensor/blob/master/install_guide_pi.md
2. Testaa yhdeyten toimivuutta read_write/ -kansiosta löytyvän connect_test.py -ohjelman avulla komennolla ```python connect_test.py```. Mikäli saat seuraavaa muistuttavan vastauksen asennus on onnistunut: {'pressure': 1025.0, 'identifier': None, 'temperature': -11.0, 'humidity': 72.0} 1025.0
3. Datan lukemisen ajoittaminen tapahtuu cronin avulla. Avaa crontab editorilla esim: ```sudo nano /etc/crontab```
4. Lisää listaan rivi ```*/2 *   * * *   root    python <polku tiedostoon esim. /home/niko/ruuvi/read-write/read_and_save_observations.py>``` ja tallenna. Nyt sääsensorilta dataa lukeva ja sitä tietokantaan tallentava ohjelma suoritetaan kahden minuutin välein.

# Rajapinnan asennus ja käyttöliittymän käynnistäminen:

1. Asenna node.js, mikäli se ei ole jo asennettu. Noden voi asentaa komennolla: ```curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash```. Node.js mahdollistaa Javascript-koodin suorittamisen ilman selainta.
2. Ota node.js käyttöön komennolla “nvm use node” (tämän jälkeen node.js:ää ei tarvitse asentaa enää uudestaan).
3. Siirry api/ -kansioon ja aja komento: ```npm install```
4. Rajapinnan voi nyt kytkeä päälle komennolla ```node index.js```
Rajapinta on nyt käynnissä ja siitä pääsee katsomaan osoitteesta localhost:4000/graphql (korvaa localhost laitteen ip:llä)
Dashboard sijaitsee nyt osoitteessa localhost:4000/index.html
