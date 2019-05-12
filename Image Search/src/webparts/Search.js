import { sp, Web, ListEnsureResult } from 'sp-pnp-js';
var oWebRelativeURL = "/sites/ImageLibraryDev";
var listImage = "/Image%20Library";
var listLOB = "/Lists/LOB";
var listInstryType = "/Lists/Industry%20Type";
var filterLOBId = "Line_x0020_of_x0020_BusinessId";
var filterITType = "Industry_x0020_Type";
$(document).ready(function () {
    startLoading();
    getFilterData();
    getFilterIndustryType()
    getImages();
    $(document).on('click', '.checkbox-filter', function () {
        var filterString = getFilterString();
        getImages(filterString)
        var arrSelectedText = [];
        $('.checkbox-filter:checked').each(function (index, ele) {
            var selectedText = $(this).next().attr("title")

            arrSelectedText.push("<span class='span-selected-filter'>" + selectedText + "</span><span class='span-selected-filter-close'>&#9747;</span>")
        })

        if (arrSelectedText.length >= 0) {
            $('#dvSelectedFilter').empty();
            $('#dvSelectedFilter').append(arrSelectedText.join("  "));
        }
        
    })
    $(document).on('click', '.span-selected-filter-close', function () {
        //var spanEle=$('span[title="'+$(this).prev().text()+'"]');
        try {
            var spanEle=$('span[title="'+$(this).prev().text()+'"]');
            $(this).prev().remove();
            $(this).remove()
            $(spanEle).prev().click();
          
            
        } catch (error) {
            
        }
        
    })
    $('#btnDownload').click(function () {
        
        var temporaryDownloadLink = document.createElement("a");
        temporaryDownloadLink.style.display = 'none';
        document.body.appendChild(temporaryDownloadLink);

        $('.chk-download input:checked').each(function () {

                var imgName=$(this).closest('div').find('a').attr("data-name")
                temporaryDownloadLink.setAttribute('href', $(this).closest('div').find('a').attr("href"));
                temporaryDownloadLink.setAttribute('download', imgName);

                temporaryDownloadLink.click();
        
           
           
        });
        document.body.removeChild(temporaryDownloadLink);
        $('.chk-download input:checked').prop('checked',false);
        $('#dvDownloadPanel').hide();
        return false; //cancel navigation
    });
    $(document).on('click', '.chk-download input', function () {
        if ($('.chk-download input:checked').length > 0) {
            $("#dvDownloadPanel").show();
        }
        else {
            $("#dvDownloadPanel").hide();
        }

    })
    $('#txtSearch').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            if ($('#txtSearch').val() != "") {
                var filterString = getFilterString();
                getImages(filterString)
            }
        }
    });
    $('#txtSearch').on('input', function (e) {
        if ($('#txtSearch').val().length == 0) {
            getImages("")
        }
    });

    $('div[class*="pageTitle"]').hide();
    console.log(window.location.href);
})

function getImages(filterString) {
    if (!filterString) {
        filterString = "";
    }
    startLoading();

    sp.site.rootWeb.getList(oWebRelativeURL + listImage).items.select('*','LinkFilename', 'FileRef', 'EncodedAbsThumbnailUrl').filter(filterString).get().then((data) => {
        renderImages(data);
    }).catch((error) => {
        console.log("Error while getting Images ", error);
    });
}
function getFilterIndustryType() {
    sp.site.rootWeb.getList(oWebRelativeURL + listInstryType).items.select("Id", "Title").orderBy("Title").get().then((data) => {
        renderFilterCheckboxes(data, filterITType, "IT", "dvIndustryType");
    }).catch((error) => {
        console.log("Error while getting Clubs info list items ", error);
    });
}
function getFilterData() {
    sp.site.rootWeb.getList(oWebRelativeURL + listLOB).items.select("Id", "Title").orderBy("Title").get().then((data) => {
        renderFilterCheckboxes(data, filterLOBId, "LOB", "dvLineOfBusiness");
    }).catch((error) => {
        console.log("Error while getting Clubs info list items ", error);
    });
}
function renderImages(data) {
    $('#dvImages').empty();
    if (data.length > 0) {
        data.forEach(element => {
            var toolTip = element.Title;
            var strHTML = `<div class="div-download"><a data-name="`+element.LinkFilename+`" href="` + element.FileRef + `" target="_blank"><Image  src="` + element.EncodedAbsThumbnailUrl + `" alt="Image"/></a>
                            <label class="pure-material-checkbox chk-download" data-title="`+ toolTip + `">
                            <input tabindex="-1" type="checkbox" class="ms-CheckBox-input">
                            <span ></span>  
                            </label></div>`;
            $('#dvImages').append(strHTML)
        });
    }
    endLoading();
}
function renderFilterCheckboxes(data, filterColumn, columnPrefix, divId) {
    if (data.length > 0) {
        data.forEach(element => {
            var toolTip = element.Title;
            var lblId = columnPrefix + element.Id;
            var choiceId = element.Id;
            var lblTitle = element.Title;
            var strHTML = `<label class="pure-material-checkbox" data-title="` + toolTip + `">
                            <input data-filter-column="`+ filterColumn + `" data-filter-id="` + choiceId + `" tabindex="-1" type="checkbox" class="ms-CheckBox-input checkbox-filter">
                            <span class="ms-Label-img" id="`+ lblId + `"  title="` + toolTip + `">` + element.Title + `</span>  
                            </label>
                    </label>`;
            var countFilter = filterColumn + " eq " + choiceId;
            if ($('#txtSearch').val() != "") {

                countFilter += `and substringof('${encodeURIComponent($('#txtSearch').val())}',Title)`;
            }
            sp.site.rootWeb.getList(oWebRelativeURL + listImage).items.select("Title").filter(countFilter).getAll().then((dataCount) => {
                if (dataCount.length > 0) {
                    $('#' + divId).append(strHTML)
                    var lblText = "(" + dataCount.length + ") " + lblTitle;
                    $('#' + lblId).text(lblText);
                    $("#" + divId + " label").sort(asc_sort).appendTo('#' + divId);
                }

            }).catch((error) => {
                console.log("Error while getting count ", error);
            });
        });


    }
}

function getFilterString() {
    var strFilterString = [];
    $('.checkbox-filter').each(function (index, ele) {
        if ($(ele).prop('checked')) {
            strFilterString.push($(ele).attr('data-filter-column') + " eq " + $(ele).attr('data-filter-id'))
        }
    })
    if ($('#txtSearch').val() != "") {
        strFilterString.push(`substringof('${encodeURIComponent($('#txtSearch').val())}',Title)`);
    }
    if (strFilterString.length > 0) {
        return strFilterString.join(' or ')
    }
    else {
        return "";
    }
}
function startLoading() {
    $('#dvMain').hide();
    $('#dvProcess').show();
}
function endLoading() {
    $('#dvMain').show();
    $('#dvProcess').hide();
}

//$("#debug").text("Output:");
// accending sort
function asc_sort(a, b) {
    return ($(b).attr('data-title')) < ($(a).attr('data-title')) ? 1 : -1;
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if ($(content).is(":visible")) {
            $(content).hide();
            $(this).find('i').addClass('fa-angle-down');
            $(this).find('i').removeClass('fa-angle-up')
        }
        else {
            $(this).find('i').removeClass('fa-angle-down');
            $(this).find('i').addClass('fa-angle-up')
            $(content).show();
        }
        // if (content.style.maxHeight){
        //   content.style.maxHeight = null;
        // } else {
        //   content.style.maxHeight = content.scrollHeight + "px";
        // } 
    });
}