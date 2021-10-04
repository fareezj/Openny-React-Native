import React, { useState } from "react"
import { View, StyleSheet, Button, Image } from "react-native"
import { Text } from "../../../components"
import Modal from "react-native-modal"
import { Calendar } from "react-native-calendars"
import moment from "moment"

export const CalendarModal = ({ closeModal, chosenDate }) => {
  const [pickedDate, setPickedDate] = useState("")

  const customStyles = {
    container: {
      backgroundColor: "#596C80",
      width: 30,
      height: 30,
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: "#FFFFFF",
      textAlign: "center",
      fontSize: 16,
    },
  }

  const dateMarked = (date) => {
    const chosenDate = date
    const obj = {
      [chosenDate]: {
        customStyles,
      },
    }
    return obj
  }

  return (
    <View>
      <Modal isVisible={true} onBackdropPress={() => closeModal()}>
        <View style={CalendarModalStyle.BASE}>
          <View style={CalendarModalStyle.CONTENT}>
            <Calendar
              markingType={"custom"}
              // Initially visible month. Default = Date()
              current={moment().format("YYYY-MM-DD")}
              // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
              minDate={"1975-05-10"}
              // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
              maxDate={moment().format("YYYY-MM-DD")}
              // Handler which gets executed on day press. Default = undefined
              onDayPress={(day) => {
                setPickedDate(day.dateString)
              }}
              markedDates={dateMarked(pickedDate)}
              // Handler which gets executed on day long press. Default = undefined
              onDayLongPress={(day) => {
                //console.log("selected day", day)
              }}
              // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
              monthFormat={"yyyy MM"}
              // Handler which gets executed when visible month changes in calendar. Default = undefined
              onMonthChange={(month) => {
                //console.log("month changed", month)
              }}
              // Hide month navigation arrows. Default = false
              hideArrows={false}
              // Replace default arrows with custom ones (direction can be 'left' or 'right')
              renderArrow={(direction) =>
                direction === "left" ? (
                  <Image
                    source={require("../../../../assets/back-icon.png")}
                    style={CalendarModalStyle.ARROW_ICON}
                  />
                ) : (
                  <Image
                    source={require("../../../../assets/arrow-right.png")}
                    style={CalendarModalStyle.ARROW_ICON}
                  />
                )
              }
              // Do not show days of other months in month page. Default = false
              hideExtraDays={true}
              // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
              // day from another month that is visible in calendar page. Default = false
              disableMonthChange={false}
              // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
              firstDay={1}
              // Hide day names. Default = false
              hideDayNames={true}
              // Show week numbers to the left. Default = false
              showWeekNumbers={false}
              // Handler which gets executed when press arrow icon left. It receive a callback can go back month
              onPressArrowLeft={(subtractMonth) => subtractMonth()}
              // Handler which gets executed when press arrow icon right. It receive a callback can go next month
              onPressArrowRight={(addMonth) => addMonth()}
              // Disable left arrow. Default = false
              disableArrowLeft={false}
              // Disable right arrow. Default = false
              disableArrowRight={false}
              // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
              disableAllTouchEventsForDisabledDays={true}
              // Replace default month and year title with custom one. the function receive a date as parameter
              renderHeader={(date) => {
                return (
                  <Text
                    style={{ color: "black" }}
                    text={moment(date.toISOString()).format("MMM YYYY").toUpperCase()}
                  />
                )
              }}
              // Enable the option to swipe between months. Default = false
              enableSwipeMonths={true}
              style={{
                borderWidth: 1,
                borderColor: "gray",
                height: "100%",
              }}
              theme={CalendarTheme}
            />
          </View>
          <Button
            title="OKAY"
            onPress={() => {
              chosenDate(moment(pickedDate).format("DD MMM YYYY"))
              closeModal()
            }}
          />
        </View>
      </Modal>
    </View>
  )
}

const CalendarTheme = {
  backgroundColor: "blue",
  calendarBackground: "white",
  textSectionTitleColor: "#b6c1cd",
  textSectionTitleDisabledColor: "#d9e1e8",
  selectedDayBackgroundColor: "black",
  selectedDayTextColor: "#ffffff",
  todayTextColor: "#00adf5",
  dayTextColor: "black",
  textDisabledColor: "gray",
  dotColor: "blue",
  selectedDotColor: "#ffffff",
  arrowColor: "orange",
  disabledArrowColor: "#d9e1e8",
  monthTextColor: "blue",
  indicatorColor: "blue",
  textDayFontWeight: "300",
  textMonthFontWeight: "bold",
  textDayHeaderFontWeight: "300",
  textDayFontSize: 16,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 16,
}

const CalendarModalStyle = StyleSheet.create({
  BASE: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: "white",
    maxHeight: 400,
    maxWidth: 400,
    padding: 15,
    justifyContent: "center",
  },
  CONTENT: {
    flex: 1,
  },
  TEXT_INPUT: {
    borderWidth: 1,
    color: "blue",
    borderColor: "black",
    marginHorizontal: 15,
    paddingBottom: 20,
    marginBottom: 10,
  },
  ARROW_ICON: {
    width: 20,
    height: 20,
  },
})
