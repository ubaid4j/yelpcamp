let Campground  = require("./models/campground"),
    Comments    = require("./models/comments");

let data = [
    {
        name: "Jenny Lake Camp",
        image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
        description: "ISLAMABAD/DG KHAN/ OKARA: The Election Commission of Pakistan (ECP) on Saturday published the final list of candidates and allotted them election symbols as per schedule.\n" +
        "\n" +
        "June 30 was the last day for publication of the final lists of candidates and allotment of election symbols. A day earlier the candidates had the opportunity to withdraw their nomination papers.\n" +
        "\n" +
        "A total of 21,482 candidates had filed nomination papers this time and several have withdrawn. For 2013 general elections, over 28,000 nomination papers were filed.\n" +
        "\n" +
        "A senior official of the Election Commission told The News that the lists of candidates were displayed outside the offices of respective returning officers (ROs) and all legal requirements were fulfilled. “All the respective returning officers have furnished the lists and following a due procedure they have been displayed,” said the official.\n" +
        "\n" +
        "Meanwhile, one constituency was removed from Attock district’s three seats and added to the federal capital, increasing the National Assembly seats from two to three after the delimitation of constituencies. The Election Commission has given green light to a total of 76 candidates to contest for the three seats of National Assembly from Islamabad in the upcoming general elections as per the list displayed here on Saturday. According to the final list of candidates, out of these three constituencies, the highest number of 36 contestants are vying from NA-53. However, it is quite obvious the real contest will mainly be between the PTI Chairman Imran Khan and former prime minister Shahid Khaqan Abbasi."
    },
    {
        name: "Wye Valley Camping",
        image: "https://farm8.staticflickr.com/7259/7121858075_7375241459.jpg",
        description: "ISLAMABAD/DG KHAN/ OKARA: The Election Commission of Pakistan (ECP) on Saturday published the final list of candidates and allotted them election symbols as per schedule.\n" +
        "\n" +
        "June 30 was the last day for publication of the final lists of candidates and allotment of election symbols. A day earlier the candidates had the opportunity to withdraw their nomination papers.\n" +
        "\n" +
        "A total of 21,482 candidates had filed nomination papers this time and several have withdrawn. For 2013 general elections, over 28,000 nomination papers were filed.\n" +
        "\n" +
        "A senior official of the Election Commission told The News that the lists of candidates were displayed outside the offices of respective returning officers (ROs) and all legal requirements were fulfilled. “All the respective returning officers have furnished the lists and following a due procedure they have been displayed,” said the official.\n" +
        "\n" +
        "Meanwhile, one constituency was removed from Attock district’s three seats and added to the federal capital, increasing the National Assembly seats from two to three after the delimitation of constituencies. The Election Commission has given green light to a total of 76 candidates to contest for the three seats of National Assembly from Islamabad in the upcoming general elections as per the list displayed here on Saturday. According to the final list of candidates, out of these three constituencies, the highest number of 36 contestants are vying from NA-53. However, it is quite obvious the real contest will mainly be between the PTI Chairman Imran Khan and former prime minister Shahid Khaqan Abbasi."
    },
    {
        name: "Day 175: Camping",
        image: "https://farm9.staticflickr.com/8010/7436786986_9972800b37.jpg",
        description: "ISLAMABAD/DG KHAN/ OKARA: The Election Commission of Pakistan (ECP) on Saturday published the final list of candidates and allotted them election symbols as per schedule.\n" +
        "\n" +
        "June 30 was the last day for publication of the final lists of candidates and allotment of election symbols. A day earlier the candidates had the opportunity to withdraw their nomination papers.\n" +
        "\n" +
        "A total of 21,482 candidates had filed nomination papers this time and several have withdrawn. For 2013 general elections, over 28,000 nomination papers were filed.\n" +
        "\n" +
        "A senior official of the Election Commission told The News that the lists of candidates were displayed outside the offices of respective returning officers (ROs) and all legal requirements were fulfilled. “All the respective returning officers have furnished the lists and following a due procedure they have been displayed,” said the official.\n" +
        "\n" +
        "Meanwhile, one constituency was removed from Attock district’s three seats and added to the federal capital, increasing the National Assembly seats from two to three after the delimitation of constituencies. The Election Commission has given green light to a total of 76 candidates to contest for the three seats of National Assembly from Islamabad in the upcoming general elections as per the list displayed here on Saturday. According to the final list of candidates, out of these three constituencies, the highest number of 36 contestants are vying from NA-53. However, it is quite obvious the real contest will mainly be between the PTI Chairman Imran Khan and former prime minister Shahid Khaqan Abbasi."

    }

];


function remove_()
{

    Campground.remove({}, function(err)
    {

        if(!err)
        {
            console.log("Removed");

            data.forEach(function(camp)
            {
                Campground.create(camp, function (err, saveCamp)
                {
                    if (err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        console.log("Camp Added");
                    }
                });

            });
        }
    });

}

module.exports = remove_;
