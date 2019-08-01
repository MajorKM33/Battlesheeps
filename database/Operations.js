module.exports = function () {

    var opers = {

        // wstawienie jednego "rekordu" do dokumentu - INSERT

        InsertOne: function (data) {
            data.save(function (error, data, dodanych) {
                console.log("dodano " + data)
            })
        },

        // pobranie wszystkich "rekordów" z dokumentu - SELECT
        // zwracamy uwagę na argument Model

        SelectAll: function (Model, callback) {
            Model.find({},function (err, data) {
                if (err) return console.error(err);
                console.log(data);
                callback(data);
            })
        },

        //pobranie z ograniczeniem ilości i warunkiem - WHERE, LIMIT

        SelectByImie: function (Model, imie, count) {
            Model.find({imie:imie}, function (err, data) {
                if (err) return console.error(err);
                console.log(data);
            }).limit(count)
        },

        SelectByLogin: function (Model, login, callback) {
            Model.find({name:login}, function (err, data) {
                if (err) return console.error(err);
                console.log(data);
                callback(data);
            })
        },

        SelectSheep: function (Model, login, callback) {
            Model.find({login:login}, function (err, data) {
                if (err) return console.error(err);
                console.log(data);
                callback(data);
            })
        },

        UpdateWins: function (Model, player, newWin) {
            Model.update({ login: player }, { wins: newWin }, function (err, data) {
                if (err) return console.error(err);
                console.log(data);
            })
        },

        UpdateLoses: function (Model, player, newLoses) {
            Model.update({ login: player }, { loses: newLoses }, function (err, data) {
                if (err) return console.error(err);
                console.log(data);
            })
        },

        //aktualizacja - np zamiana imienia - UPDATE

        UpdateImie: function (Model, oldName, newName) {
            Model.update({ imie: oldName }, { imie: newName }, function (err, data) {
                if (err) return console.error(err);
                console.log(data);
            })
        },

        UpdateBudowle: function (Model, login, budowle) {
            Model.update({ login: login }, { budowle: budowle }, function (err, data) {
                if (err) return console.error("Error updatebudowli");
                console.log(data);
            })
        },

        UpdateKlocki: function (Model, oldName, newName) {
            Model.update({ plany: oldName }, { plany: newName }, function (err, data) {
                if (err) return console.error(err);
                console.log(data);
            })
        },

        //usuniecie danych - DELETE

        DeleteAll: function (Model) {
            Model.remove(function (err, data) {
                if (err) return console.error(err);
                console.log(data);
            })
        },

        SelectAndLimit : function (Model, count, callback) {
            var obj = {};
            Model.find({},function (err, data) {
                if (err) {
                    obj.data = err
                }
                else {
                    obj.data = data
                }
                //funkcja zwracająca dane na zewnątrz
                callback( obj);
            }).limit(count)
        },
        // pozostałe niezbędne operacje trzeba sobie dopisać samemu,
        // na podstawie dokumentacji Mongoose
    }

    return opers;

}
