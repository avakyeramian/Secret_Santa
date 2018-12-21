window.onload = content;


function content()
{
    
    //  Avak Yeramian
    //
    //  GNU GENERAL PUBLIC LICENSE Version 3
    //
    // The GNU General Public License is a free, copyleft license for software and other kinds of works.

    //  The licenses for most software and other practical works are designed to take away your freedom to share and change the works.
    //  By contrast, the GNU General Public License is intended to guarantee your freedom to share and change all versions of a program--to make sure it remains free software for all its users. We, the Free Software Foundation, use the GNU General Public License for most of our software; it applies also to any other work released this way by its authors. You can apply it to your programs, too.
    //
    
    /* -- useless/20 -- */
    
    var document = window.document;
    var alert = window.alert;
    var console = window.console;
    var body = document.body;
    var navigator = window.navigator;
    
    /* -- init guests -- */
    
    var guests = [];
    var santaGuests = [];
    var beneficiaryGuests = [];
    
    //guests = [ "Avraham", "Camille", "Emma", "Coline", "Arthur" ];
    
    /* -- init dom vars  -- */
    
    var santa_div = document.getElementById("Secret_Santa");
    
    var import_export_ul = document.createElement("ul");
    import_export_ul.setAttribute("id","import_export");
    santa_div.append(import_export_ul);
    
    var import_li = document.createElement("li");
    import_export_ul.append(import_li);
    
    var import_title = document.createElement("div");
    import_title.innerHTML = "Import a guests list :";
    import_li.append(import_title);
    
    var import_input = document.createElement("input");
    import_input.setAttribute("id","import");
    import_input.setAttribute("type","file");
    import_input.setAttribute("accept","text/plain");
    import_input.setAttribute("accept","text/plain");
    import_input.onchange = importGuestsFile;
    import_li.append(import_input);
        
    var export_li = document.createElement("li");
    import_export_ul.append(export_li);
    
    var export_title = document.createElement("div");
    export_title.innerHTML = "Export current guests list :";
    export_li.append(export_title);
    
    var export_boutton = document.createElement("button");
    export_boutton.setAttribute("id","export");
    export_boutton.innerHTML = "Download";
    export_boutton.onclick = exportGuestsFile;
    export_li.append(export_boutton);
    
    var options_div = document.createElement("div");
    options_div.setAttribute("id","options");
    santa_div.append(options_div);
        
    var boutons_div = document.createElement("div");
    boutons_div.setAttribute("id","boutons");
    santa_div.append(boutons_div);
    
    var bouton_generate = document.createElement("button");
    bouton_generate.setAttribute("id","bouton_generate");
    bouton_generate.innerHTML = "🎁 Generate";
    bouton_generate.onclick = generateSantaList;
    boutons_div.append(bouton_generate);
    
    
    
    var options_ul = document.createElement("ul");
    options_div.append(options_ul);
    
    /* -- init guest list options ul -- */
    
    setGuests(guests);

    
    /* -- fonctions -- */
            
    function setGuests(guests){
        
        while (options_ul.firstChild) {
            options_ul.removeChild(options_ul.firstChild);
        }
        
        var li_add = document.createElement("li");
        
        var boutton_add = document.createElement("button");
        boutton_add.innerHTML = "+";
        boutton_add.onclick = function(event){
            var new_guest = event.target.parentElement.lastChild.value;
            if(new_guest!=""){
                guests.push(new_guest)
                addNewGuest(new_guest);
                event.target.parentElement.lastChild.value = "";
            }
        }
        li_add.append(boutton_add);
        

        
        var input_add = document.createElement("input");
        input_add.setAttribute("type","text");
        input_add.setAttribute("placeholder","Add a guest");
        input_add.setAttribute("maxlength","22");
        input_add.setAttribute("size","28");
        input_add.onkeyup = function(event){
            if (event.key === "Enter") {
                var new_guest = event.target.value;
                if(new_guest!=""){
                    guests.push(new_guest)
                    addNewGuest(new_guest);
                    event.target.value = "";
                }
            }
        };
        li_add.append(input_add);
        
        options_ul.append(li_add);
        
        for(var item in guests){
            addNewGuest(guests[item]);
        }

    }
    
    function addNewGuest(item){
            var li = document.createElement("li");
            var div_item = document.createElement("div");
            div_item.innerHTML = item;
            li.append(div_item);
                
            var boutton_rem = document.createElement("button");
            boutton_rem.innerHTML = "−";
            boutton_rem.onclick = function(event){
                var item_rem = event.target.parentElement.lastChild.data;
                guests = arrayRemove(guests, item_rem)
                event.target.parentElement.parentElement.remove();
            }
        
            div_item.prepend(boutton_rem);
        
            options_ul.prepend(li);
    }
    
    function importGuestsFile(event){
        
        var input = event.target;

        var reader = new FileReader();
        reader.onload = function(){
            //var text = reader.result;
            //var node = document.getElementById('output');
            //node.innerText = text;
            var lines = reader.result.split('\n');
            var new_guests = [];
            for(var line = 0; line < lines.length; line++){
                if(lines[line]!=""){
                    new_guests.push(lines[line]);
                }
            }
            guests = new_guests;
            setGuests(guests);
            
        }
        reader.readAsText(input.files[0]);
      }
    
    function exportGuestsFile(){
        
        var string = "";
        
        var copyGuests = guests.slice();
        copyGuests.reverse();
        
        for(var item in copyGuests){
            if(string!=""){
                string = string+"\r\n";
            }
            string = string+copyGuests[item];
        }        
                    
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(string));
        element.setAttribute('download', "export.txt");

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
    
    function exportSantasFile(){
        
        var copySantaGuests = santaGuests.slice();
        copySantaGuests.reverse();
        
        var copyBeneficiaryGuests = beneficiaryGuests.slice();
        copyBeneficiaryGuests.reverse();
        
        var string = "";
        
        for(var item in guests){
            if(string!=""){
                string = string+"\r\n";
            }
            string = string+copySantaGuests[item]+" -> "+copyBeneficiaryGuests[item];
        }        
                    
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(string));
        element.setAttribute('download', "export.txt");

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }    
    
    function arrayRemove(arr, value) {
       return arr.filter(function(ele){
           return ele != value;
       });
    }
    
    function generateSantaList(){
        if(guests.length>=2){
            beneficiaryGuests = shuffle(guests.slice());
            
            var firstGuest = beneficiaryGuests[0];
            santaGuests = beneficiaryGuests.slice();
            santaGuests.shift();
            santaGuests.push(firstGuest);
            
            
            if(document.getElementById("santa_gen")){
                document.getElementById("santa_gen").remove();
            }
            
            var santa_gen = document.createElement("div");
            santa_gen.setAttribute("id","santa_gen");
            
            var santa_table = document.createElement("table");
            santa_table.setAttribute("id","santa_table");
            
            for(var item in guests){
                var row = santa_table.insertRow(0);
                var santa = row.insertCell(0);
                var beneficiary = row.insertCell(1);
                santa.innerHTML = santaGuests[item];
                beneficiary.innerHTML = beneficiaryGuests[item];
            }
            
            var header = santa_table.createTHead();
            var row_header = header.insertRow(0);
            var santa_header = row_header.insertCell(0);
            var beneficiary_header = row_header.insertCell(1);
            santa_header.innerHTML = "Santa";
            beneficiary_header.innerHTML = "Beneficiary";
            
            santa_gen.append(santa_table);
            santa_div.append(santa_gen);

            var export_santa_boutton = document.createElement("button");
            export_santa_boutton.setAttribute("id","export");
            export_santa_boutton.innerHTML = "Download list of Santa 🎅";
            export_santa_boutton.onclick = exportSantasFile;
            santa_gen.append(export_santa_boutton);
            
        }
    }
    
    function shuffle(array) {
        var currentIndex = array.length;
        var temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

}