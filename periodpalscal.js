var nextMonthDaysArray = [];
var nextMonthOvulationArray = [];
var countorg = 0;
var timesCalled = 1;


(function ($) {
    $.calendar = function(el, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.

        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data("calendar", base);

        base.init = function(){
            base.options = $.extend({},$.calendar.defaultOptions, options);

            //Variables to be used later.  Place holders right now.
            var padding = "";
            var totalFeb = "";
            var i = 1;
            var testing = "";
            var month = base.options.month;
            var current = new Date();
            var cmonth = current.getMonth();
            var day = current.getDate();
            var year = base.options.year;
            //to check if month is from previous year
            if (base.options.type == "dateSelector") {
                //year = base.options.periodDate.getFullYear();
                if (month > cmonth) {
                    year -= 1;
                }
            }
            var tempMonth = month + 1; //+1; //Used to match up the current month with the correct start date.
            var prevMonth = month - 1;

            //Determing if Feb has 28 or 29 days in it.
            if (month == 1) {
                if ((year % 100 !== 0) && (year % 4 === 0) || (year % 400 === 0)) {
                    totalFeb = 29;
                } else {
                    totalFeb = 28;
                }
            }

            var monthNames = base.options.monthNames;
            var monthFullNames = base.options.monthFullNames;
            var dayNames = base.options.dayNames;
            var totalDays = ["31", "" + totalFeb + "", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
            //days in each month
            var tempDate = new Date(year, month, 1); // date set to 1st of selected month
            var tempweekday = tempDate.getDay(); //gets weekday of given date in number format
            var tempweekday2 = tempweekday;

            var dayAmount = totalDays[month]; //total days of current month



            var periodDate = base.options.periodDate;
            var ov = new Date(base.options.ovulationDate);
            ovulationDate = new Date(ov.setDate(ov.getDate() + 11));


            var periodCycle = base.options.periodCycle;



            var periodDuration = base.options.periodDuration; // 5 days
            var ovulationDuration = base.options.ovulationDuration;

            /* TODO: generate the below two arrays dynamically */
            var periods = []; //will contain all the period dates
            var ovulation = []; //will contain all the ovulation dates
            var firstd = new Date(year,month,1);
            firstd = firstd.setDate(1);
            /* TODO: remove the below code if periods and ovulations are generated dynamically */
            //var perdate = periodDate;
            var dayAmountTemp = dayAmount; //30
            if (base.options.type == "forecast") {

                if (timesCalled > 12) {


                    timesCalled = 1;
                    nextMonthDaysArray = [];
                    nextMonthOvulationArray = [];
                    countorg = 0;
                }
                //else
                //{
                //    timesCalled += 1;
                //}

                //if (timesCalled == 1 && base.options.type == "forecast" && (base.options.periodDate.getMonth() > base.options.originalDate.getMonth()))
                //{
                //    var orgnlDate = new Date(base.options.originalDate);
                //    var pdat = new Date(base.options.periodDate);

                //    while (pdat.getMonth() > month) {
                //        pdat = new Date(pdat.setDate(pdat.getDate() - periodDuration - periodCycle + 1));

                //    }
                //    for (var date = 0; date < dayAmountTemp; date += (periodCycle)) {

                //        for (var x = 0; x < periodDuration; x++) {

                //            var tempDate = new Date(pdat);
                //            var tempOvDate = new Date(pdat);
                //            tempDate = new Date(tempDate.setDate(tempDate.getDate() + x + date));
                //            tempOvDate = new Date(tempOvDate.setDate(tempOvDate.getDate() + x + date + 11));
                //            if (tempDate.getMonth() == month && tempDate.getFullYear() == year) {
                //                nextMonthDaysArray.push(new Date(tempDate));
                //            }
                //            if (tempOvDate.getMonth() == month && tempOvDate.getFullYear() == year) {
                //                nextMonthOvulationArray.push(new Date(tempOvDate));
                //            }


                //        }
                //        date = x + date - 1;

                //    }
                //    countorg++;
                //}




                for (var mnt = 0; mnt < nextMonthDaysArray.length; mnt++)
                {
                    if (nextMonthDaysArray[mnt].getMonth() == month && nextMonthDaysArray[mnt].getFullYear() == year) {

                        periods.push(new Date(nextMonthDaysArray[mnt]));

                        nextMonthDaysArray.splice(mnt, 1);
                        mnt--;

                    }
                }




                for (var ovul = 0; ovul < nextMonthOvulationArray.length; ovul++) {
                    if (nextMonthOvulationArray[ovul].getMonth() == month && nextMonthOvulationArray[ovul].getFullYear() == year) {
                        ovulation.push(new Date(nextMonthOvulationArray[ovul]));
                        nextMonthOvulationArray.splice(ovul, 1);
                        ovul--;
                    }
                }





                for (var date = 0; date < dayAmountTemp; date += (periodCycle)) {

                    for (var x = 0; x < periodDuration; x++) {

                        var tempDate = new Date(periodDate);
                        tempDate = new Date(tempDate.setDate(tempDate.getDate() + x + date));
                        if (tempDate.getMonth() == month && tempDate.getFullYear() == year) {
                            periods.push(new Date(tempDate));
                        }
                        else{
                            nextMonthDaysArray.push(new Date(tempDate));
                        }


                    }
                    //date = x + date - 1;

                }


                for (var date2 = 0; date2 < dayAmountTemp; date2 += (periodCycle)) {

                    for (var y = 0; y < ovulationDuration; y++) {

                        var tempDate1 = new Date(ovulationDate);
                        tempDate1 = new Date(tempDate1.setDate(tempDate1.getDate() + y + date2));
                        if (tempDate1.getMonth() == month && tempDate1.getFullYear() == year) {
                            ovulation.push(new Date(tempDate1));
                        }
                        else {
                            nextMonthOvulationArray.push(new Date(tempDate1));
                        }
                    }
                    //date2 = y + date2 - 1;
                }

                timesCalled+=1;


            }

            while (tempweekday > 0) {
                padding += "<td class='premonth'></td>";
                //preAmount++;
                tempweekday--;
            }
            //////////////////////////////////////////////////
            // Filling in the calendar with the current     //
            // month days in the correct location along.    //
            //////////////////////////////////////////////////

            while (i <= dayAmount) {

                //////////////////////////////////////////
                // Determining when to start a new row  //
                //////////////////////////////////////////

                if (tempweekday2 > 6) {
                    tempweekday2 = 0;
                    padding += "</tr><tr>";
                }

                //////////////////////////////////////////////////////////////////////////////////////////////////
                // checking to see if i is equal to the current day, if so then we are making the color of //
                //that cell a different color using CSS. Also adding a rollover effect to highlight the  //
                //day the user rolls over. This loop creates the acutal calendar that is displayed.     //
                //////////////////////////////////////////////////////////////////////////////////////////////////

                var className = '';
                if (base.options.type === 'forecast') {

                    for (var on = 0; on < ovulation.length; on++) {
                        if (ovulation[on].getDate() === i) {
                            className = 'ovulation';
                        }
                    }
                    for (var pd = 0; pd < periods.length; pd++) {
                        if (periods[pd].getDate() === i) {
                            className = 'period';
                        }
                    }

                }


                if (i == day && month == cmonth) {
                    if (i === 1 && base.options.showSmallMonthName) {
                        if (base.options.type === 'dateSelector') {
                            padding += "<td class='currentday day active " + className + "' ><span class='hidden-lg'>" + monthNames[month] + "</span><div>" + i + "</div></td>";
                        } else {
                            padding += "<td class='currentday day " + className + "' ><span class='hidden-lg'>" + monthNames[month] + "</span><div>" + i + "</div></td>";
                        }
                    } else {
                        if (base.options.type === 'dateSelector') {
                            padding += "<td class='currentday day active " + className + "' ><div>" + i + "</div></td>";
                        } else {
                            padding += "<td class='currentday day " + className + "' ><div>" + i + "</div></td>";
                        }
                    }
                } else {
                    if (i === 1 && base.options.showSmallMonthName) {
                        padding += "<td class='currentmonth day " + className + "' ><span class='hidden-lg'>" + monthNames[month] + "</span><div>" + i + "</div></td>";
                    } else {
                        padding += "<td class='currentmonth day " + className + "' ><div>" + i + "</div></td>";
                    }

                }

                tempweekday2++;
                i++;
            }




            /////////////////////////////////////////
            // Ouptputing the calendar onto the //
            // site.  Also, putting in the month    //
            // name and days of the week.       //
            /////////////////////////////////////////

            var calendarTable = "<table class='calendar' width='100%'>";
            if (base.options.showHeader) {
                calendarTable += "<tr class='currentmonth'><th colspan='7'>" + monthFullNames[month] + " " + year + "</th></tr>";
                var days = '';
                for (var i = 0; i < base.options.dayNames.length; i++) {
                    days += '<td>'+base.options.dayNames[i]+'</td>'
                }
                calendarTable += "<tr class='weekdays'>"+days+ "</tr>";
            }
            calendarTable += "<tr>";
            calendarTable += padding;
            calendarTable += "</tr></table>";
            base.$el.html(calendarTable);


            base.$el.find('.day').click(function (e) {
                var dPicker="";
                if (base.options.type === 'dateSelector') {
                    $('.calendar').find('.day').removeClass('active');
                    $(this).addClass('active');
                    //to find year
                    dPicker = $(this).parents('[class="datePicker"]');

                }
                if (base.options.click) {
                    var yearNow = base.options.year;
                    //if (base.options.month > new Date().getMonth()) {
                    //    var yearNow = base.options.year - 1;
                    //}
                    //else {
                    //    var yearNow = base.options.year;
                    //}

                    if (dPicker != "" && dPicker != null) {
                        if (dPicker.attr("id") == "datePicker2") {
                            //$(this).parents().eq(5).find("#datePicker1")
                            if (base.options.month == 11) {
                                var yearNow = base.options.year - 1;
                            }
                        }
                        else if (dPicker.attr("id") == "datePicker3") {
                            if (base.options.month == 11 || base.options.month == 10) {
                                var yearNow = base.options.year - 1;
                            }
                        }
                        else if (dPicker.attr("id") == "datePicker5") {
                            if (base.options.month == 11) {
                                var yearNow = base.options.year - 1;
                            }

                        }
                        else if (dPicker.attr("id") == "datePicker6") {
                            if (base.options.month == 11 || base.options.month == 10) {
                                var yearNow = base.options.year - 1;
                            }
                        }

                    }

                    e.selectedDate = new Date(yearNow, base.options.month, $(this).find('div').text())

                    base.options.click(e);
                }
            });
        };



        // Run initializer

        base.init();

    };

    $.calendar.defaultOptions = {
        year: new Date().getFullYear(),
        month : new Date().getMonth(),
        type : 'dateSelector',
        click: function() {},
        showSmallMonthName : false,
        showHeader : true,
        monthFullNames : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthNames : ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
        dayNames : ["s", "m", "t", "w", "t", "f", "s"],
        periodDate: new Date(),
        ovulationDate: new Date(),
        periodCycle : 10,
        periodDuration : 5,
        ovulationDuration: 5

    };
    $.fn.calendar = function (options) {


        return this.each(function () {
            (new $.calendar(this, options));
        });
    };

    // This function breaks the chain, but returns
    // the calendar if it has been attached to the object.
    $.fn.getcalendar = function(){
        return this.data("calendar");
    };





})(periodpalscal);
