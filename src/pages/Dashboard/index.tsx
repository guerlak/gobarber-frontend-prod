import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import DayPicker, { DayModifiers } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { FiPower, FiClock } from "react-icons/fi";
// eslint-disable-next-line import/no-duplicates
import { isToday, format, parseISO } from "date-fns";
// eslint-disable-next-line import/no-duplicates
import ptBR from "date-fns/locale/pt-BR";
import { useAuth } from "../../hooks/Auth";
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointment,
  Section,
  Appointment,
} from "./styles";

import logo from "../../assets/logo.svg";
import api from "../../services/api";
import Modal from "../../components/Modal";

interface MonthAvalabilityItem {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  formatedDate: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvalabilityItem[]
  >([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [modalToggle, setModalToggle] = useState(false);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);
  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get(`providers/${user.id}/available-month`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then((res) => {
        setMonthAvailability(res.data);
      })
      .catch(() => {
        signOut();
      });
  }, [currentMonth, user.id, signOut]);

  useEffect(() => {
    api
      .get<Appointment[]>(`appointments/me`, {
        params: {
          day: selectedDate.getDate(),
          month: selectedDate.getMonth() + 1,
          year: selectedDate.getFullYear(),
        },
      })
      .then((res) => {
        const appointmentsWithFormatedDate = res.data.map((app) => {
          return {
            ...app,
            formatedDate: format(parseISO(app.date), "HH:mm"),
          };
        });
        setAppointments(appointmentsWithFormatedDate);
      });
  }, [selectedDate, currentMonth]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const date = new Date(year, month, monthDay.day);
        return date;
      });
    return dates;
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(() => {
    const date = format(selectedDate, "'dia ' dd 'de' MMMM ", {
      locale: ptBR,
    });
    const weekDay = format(selectedDate, "cccc", { locale: ptBR });

    return {
      date,
      weekDay,
    };
  }, [selectedDate]);

  const todayAppointments = useMemo(() => {
    const morning = appointments.filter(
      (app) => parseISO(app.date).getHours() < 12
    );

    const afternoon = appointments.filter(
      (app) => parseISO(app.date).getHours() >= 12
    );
    return {
      morning,
      afternoon,
    };
  }, [appointments]);

  const signOutConfirm = useCallback(() => {
    setModalToggle(!modalToggle);
  }, [modalToggle]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="GoBarber" />
          <Profile>
            <Link to="/profile">
              <img
                src={user.avatar_url || "http://place-puppy.com/200x200"}
                alt="Avatar"
              />
            </Link>
            <div>
              <span>Bem vindo</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOutConfirm}>
            <FiPower />
          </button>
          {modalToggle && <Modal toggle={signOutConfirm} />}
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p style={{ minWidth: 350 }}>
            {isToday(selectedDate) ? <span>hoje</span> : ""}
            <span>{selectedDateAsText.date}</span>
            <span>{selectedDateAsText.weekDay}</span>
          </p>

          {appointments.length > 0 ? (
            <NextAppointment>
              <strong>Atendimento a seguir</strong>
              <div>
                <img
                  src={appointments[0].user.avatar_url}
                  alt={appointments[0].user.name}
                />
                <strong>{appointments[0].user.name}</strong>
                <span>
                  <FiClock />
                  {appointments[0].formatedDate}
                </span>
              </div>
            </NextAppointment>
          ) : (
            ""
          )}

          <Section>
            <strong>Manhã</strong>
            {todayAppointments.morning.length > 0 ? (
              ""
            ) : (
              <p>Nenhum agendamento neste período</p>
            )}

            {todayAppointments.morning.map((app) => (
              <Appointment key={app.date}>
                <span>
                  <FiClock />
                  {app.formatedDate}
                </span>
                <div>
                  <img src={app.user.avatar_url} alt="avatar" />
                  <strong>{app.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
          <Section>
            <strong>Tarde</strong>
            {todayAppointments.afternoon.length > 0 ? (
              ""
            ) : (
              <p>Nenhum agendamento neste período</p>
            )}
            {todayAppointments.afternoon.map((app) => (
              <Appointment key={app.date}>
                <span>
                  <FiClock />
                  {app.formatedDate}
                </span>
                <div>
                  <img src={app.user.avatar_url} alt="avatar" />
                  <strong>{app.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={["D", "S", "T", "Q", "Q", "S", "S"]}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onMonthChange={handleMonthChange}
            onDayClick={handleDateChange}
            selectedDays={selectedDate}
            months={[
              "Janeiro",
              "Fevereiro",
              "Março",
              "Abril",
              "Maio",
              "Junho",
              "Julho",
              "Agosto",
              "Setembro",
              "Outubro",
              "Novembro",
              "Dezembro",
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
