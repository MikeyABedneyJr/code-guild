(function() {
      
    //this is a dummy datastructure for the receipt object  
      
    var receipt = {'apple': 10,
                    'bacon': 20,
                    'pear': 15};
                    
    var people_at_table = prompt('how many people are in the party?');
    parseInt(people_at_table);
    
    var bill = function() {
        
        //loops through the receipt object and adds up the cost of each item
        
        var total = 0;
        for(var item in receipt) {
            total += receipt[item];
        }
        return total.toFixed(2);
    }
    
    var bill_total = bill()
    alert("the bill is $" + bill_total);
    
    var tip = function() {
        
        /*creates a scalar value to multiply the bill by
        and checks if the tip is under 10*/
        
        var tip_amount = prompt('what percentage do you want to tip?');
        parseInt(tip_amount);
        
        if (tip_amount < 10) {
            console.log("You should tip at least 10%");
            tip();
        };
            return tip_amount / 100 + 1;
        };
    
    var individual_receipts = function() {
        
	/*create person objects from the Diner constructor for each person.
	  Each person object will have methods for accessing what they bought
	  and how much their indiviual bills are.*/

        var table = [];
        
        function Diner(name) {
            
            this.name = name.toLowerCase();
            this.purchased = [];
            this.owes = 0;
        };
        
        //put people objects into the table array using the Diner constructor
        
        for (var i = 0; i < people_at_table; i++) {
            var name = prompt("Who is paying on the check?");
            
            name.toLowerCase();
            
            var person = new Diner(name);
            
            table.push(person);
        };
        
        /*add a method to each person to total up the owes property based
        based on the contents of the purchased array*/
        
        Diner.prototype.getTotal = function() {
            
            for (var item in this.purchased) {
                this.owes += receipt[this.purchased[item]];
            };
        };
        
        /*adding a method to display the list of things each person bought*/
        
        Diner.prototype.getPurchases = function() {
        
            var ticket = ""
            
            for (var item in this.purchased) {
                ticket += (this.purchased[item] + ", ");
            };
            return ticket;
        };
        
        var split_it_up = function() {
            
            /*each item string in the receipt object is matched to a person in the table
            array and then put into each person's purchased items array to be totaled*/
            
            for (var item in receipt) {
                var buyer = prompt("who bought " + "the " + item + " ?");
                
                buyer.toLowerCase();
                
                for (var i = 0; i < table.length; i++) {
                    if (buyer === table[i].name) {
                        table[i].purchased.push(item);
                    };
                };
            };
        };
        
        var create_individualized_checks = function() {
            
            /*total all the items in each person's purchased array then add the tip amount*/
            
            for (var person in table) {
                alert("OK, " + table[person].name.charAt(0).toUpperCase() + table[person].name.substring(1));
                table[person].getTotal();
                
                var tip_amount = tip();
                
                if (people_at_table > 6) {
                    
                    while (tip_amount < 1.18) {
                        console.log("the minimum tip for parties greater than 6 is 18%");
                        tip_amount = tip();
                    };
                };
                
                alert("You owe, $" + (table[person].owes * tip_amount).toFixed(2) + " for "
                      + table[person].getPurchases());
            };
        };
        
        split_it_up();
        
        create_individualized_checks();
      
    };
    
    var evenly_split = function() {
        
	/*calculates the total bill and divides it by the number
	  of people in the party.  Tip is decided before the division
	  of the check.*/

        var bill_tip = tip();
        
        var amount_due = (bill_total * bill_tip).toFixed(2);
        
        var you_owe = (amount_due / people_at_table).toFixed(2);
        
        if (people_at_table > 6) {
                    
            while (bill_tip < 1.18) {
                console.log("the minimum tip for parties greater than 6 is 18%");
                bill_tip = tip();
            };
        };
        
        alert("the bill is $" + amount_due + " and you each owe $" + you_owe);
    };
    
    var main_branch = prompt("do you want to split the bill evenly or separate the bill out?");
    
    if (main_branch === "evenly") {
        console.log(people_at_table);
        evenly_split();
    }
    else {
        individual_receipts();
    }
    })();
