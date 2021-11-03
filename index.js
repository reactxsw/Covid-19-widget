const Covid19URL = "https://covid19.ddc.moph.go.th/api/Cases/today-cases-all"

async function RequestCovid19Date() {
    const response = new Request(Covid19URL)    
    return response.loadJSON()
}

async function Covid19Widget() {
    let Data = await RequestCovid19Date()
    let CovidData = Data[0]
    let widget = new ListWidget()
    widget.backgroundColor = new Color("#A3C2E7")

    //TOP
    let TopicWidget = widget.addText("ผู้ติดเชื่อวันนี้")
    TopicWidget.centerAlignText()
    TopicWidget.font = Font.regularSystemFont(15)
    TopicWidget.textColor = new Color("#ffffff")

    widget.addSpacer(4)

    //MIDDLE
    let TodayCase = widget.addText(CovidData["new_case"].toLocaleString())
    TodayCase.centerAlignText()
    TodayCase.font = Font.boldSystemFont(30)
    TodayCase.textColor = new Color("#ffffff")

    //BOTTOM
    let UpdateDate = widget.addText(CovidData["update_date"].toLocaleString().split(" ")[0])
    UpdateDate.centerAlignText()
    UpdateDate.font = Font.boldSystemFont(10)
    UpdateDate.textColor = new Color("#ffffff")

    return widget
}
let widget = await Covid19Widget()

if (!config.runsInWidget) {
	await widget.presentSmall()
} else {
    Script.setWidget(widget)
}
Script.complete()