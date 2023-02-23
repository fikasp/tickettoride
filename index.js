let lastID = 1

const settings = {
  road: 10,
  globetrotter: 15,
  station: 4
}

const trainsMap = {
  1 : 1,
  2 : 2,
  3 : 4,
  4 : 7,
  5 : 10,
  6 : 15,
  7 : 18,
  8 : 21,
}

// Modal
const Modal = ({ info, visibility }) => {
  React.useEffect(() => {
    ref.current.focus();
  }, [])

  const ref = React.useRef(null);

  const handleKeyDown = (e) => {
    if (e.key == "Escape" || e.key == "Enter") {
      visibility(false)
    }
  }

  return (
    <div className="modal" style={{zIndex:1}}>
      <div className="modal_content" onKeyDown={handleKeyDown} tabIndex={0} ref={ref}>{info}
        <div className="modal_close" onClick={() => visibility(false)}>
          <i className="fa fa-close"/>
        </div>
      </div>
    </div>
)}

// Edit Trains
const EditTrains = ({ trains, setTrains, visibility, color }) => {
  React.useEffect(() => {
    ref.current.focus();
  }, []);

  const ref = React.useRef(null);
  const keys = Object.keys(trainsMap)
  const [trainList, setTrainList] = React.useState(trains)

  const handleKeyDown = (e) => {
    if(keys.find(key => key == e.key)) {
      setTrainList([...trainList, Number(e.key)])
    } else if (e.key == "Escape") {
      handleClose()
    }
  }
  const handleAddTrain = (e) => {
    setTrainList([...trainList, Number(e.target.innerHTML)])
  }
  const handleRemoveTrain = (id) => () => {
    setTrainList(trainList.filter((train,index) => index != id))
  }
  const handleClose = () => {
    setTrains(trainList)
    visibility(false)
  }
  const handleReset = () => {
    setTrainList([])
  }

  return (
    <div className="edit">
      <div 
        ref={ref} 
        tabIndex={0} 
        className="edit_content"
        onKeyDown={handleKeyDown} 
        style={{boxShadow: `0px 0px 20px ${color}`}}>
          
        <div className="edit_title">Lista pociągów</div>
        <div className="edit_list">

          {trainList.map((train, index) => (
            <div key={index} className="edit_item">
              <div>{train}</div>
              <div>{trainsMap[train]}</div>
              <div onClick={handleRemoveTrain(index)}>
                <i className="fa fa-trash" />
              </div>
            </div>
          ))}   

        </div>

        <div className="edit_buttons">
          {keys.map(key => (
            <button className="edit_button" key={key} onClick={handleAddTrain}>{key}</button>
          ))}
        </div>

        <div className="edit_close" onClick={handleClose}>
          <i className="fa fa-check"/>
        </div>
        <div className="edit_reset" onClick={handleReset}>
          <i className="fa fa-trash"/>
          {trainList.length !=0 ? trainList.reduce((train, sum) => train + sum): 0}
        </div>
      </div>
  </div>
  )
}

// Edit Tickets
const EditTickets = ({ tickets, setTickets, visibility, color }) => {
  React.useEffect(() => {
    ref.current.focus();
  }, []);

  const ref = React.useRef(null);
  const modalInfo = "Wprowadź liczbę naturalną z przedziału od -25 do 25!"
  const [modalVisibility, setModalVisibility] = React.useState(false);
  const [ticketList, setTicketList] = React.useState(tickets)
  const [newTicket, setNewTicket] = React.useState("")

  const handleKeyDown = (e) => {
    if(e.key =="Enter") {
      handleAddTicket()
    } else if (e.key == "Escape") {
      handleClose()
    }
  }
  const handleAddTicket = (e) => {
    if(newTicket < -25 || newTicket == 0 || newTicket > 25) {
      setModalVisibility(true)
    } else {
      setTicketList([...ticketList, Number(newTicket)])
      setNewTicket("")
      ref.current.focus();
    }
  }
  const handleRemoveTicket = (id) => () => {
    setTicketList(ticketList.filter((ticket,index) => index != id))
  }
  const handleClose = () => {
    setTickets(ticketList)
    visibility(false)
  }
  const handleReset = () => {
    setTicketList([])
  }

  return (
    <div className="edit">
      { modalVisibility && 
        <Modal info={modalInfo} visibility={setModalVisibility} /> 
      }
      <div 
        className="edit_content"
        onKeyDown={handleKeyDown}
        style={{boxShadow: `0px 0px 20px ${color}`}}>

        <div className="edit_title">Lista biletów</div>
        <div className="edit_list">

          {ticketList.map((ticket, index) => (
            <div key={index} className={`edit_item${ticket > 0 ? "" : " edit_red"}`}>
              <div>{ticket}</div>
              <div onClick={handleRemoveTicket(index)}>
                <i className="fa fa-trash" />
              </div>
            </div>
          ))}       

        </div>

        <div className="edit_adds">
          <input 
            ref={ref} 
            tabIndex={0} 
            className="edit_add"
            type="number"
            min="-25"
            max="25" 
            placeholder="Wpisz liczbę"
            value={newTicket} 
            onChange={e => setNewTicket(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="edit_add" onClick={handleAddTicket}>Dodaj bilet</button>
        </div>

        <div className="edit_close" onClick={handleClose}>
          <i className="fa fa-check"/>
        </div>
        <div className="edit_reset" onClick={handleReset}>
          <i className="fa fa-trash"/>
          {ticketList.length !=0 ? ticketList.length: 0}
        </div>
      </div>
  </div>
  )
}

// Edit Others
const EditOthers = ({ others, setOthers, visibility, color }) => {
  React.useEffect(() => {
    ref.current.focus();
  }, []);

  const ref = React.useRef(null);
  const [stations, setStations] = React.useState(others.stations)
  const [globetrotter, setGlobetrotter] = React.useState(others.globetrotter)
  const [road, setRoad] = React.useState(others.road)

  const handleKeyDown = (e) => {
    if (e.key == "Escape" || e.key =="Enter") {
      handleClose()
    }
  }
  const handleClose = () => {
    setOthers({
      stations: stations, 
      globetrotter: globetrotter,
      road: road
    })
    visibility(false)
  }

  return (
    <div className="edit">
      <div 
        className="edit_content edit_content-others"
        onKeyDown={handleKeyDown}
        style={{boxShadow: `0px 0px 20px ${color}`}}>

        <div className="edit_title">Inne punkty</div>
        <div className="edit_others">

          <label htmlFor="stations">Niewykorzystane stacje:</label>
          <select 
            ref={ref} 
            id="stations"
            className="edit_select" 
            value={stations}
            onChange={e => setStations(e.target.value)}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>

          <label htmlFor="road">Najdłuższa droga:</label>
          <input 
            id="road" 
            type="checkbox" 
            className="edit_checkbox" 
            checked={road} 
            onChange={e => setRoad(e.target.checked)}
          />

          <label htmlFor="glob">Globetrotter:</label>
          <input 
            id="glob" 
            type="checkbox" 
            className="edit_checkbox" 
            checked={globetrotter} 
            onChange={e => setGlobetrotter(e.target.checked)}
          />

        </div>

        <div className="edit_close" onClick={handleClose}>
          <i className="fa fa-check"/>
        </div>
      </div>
  </div>
  )
}

// PlayerBox
const PlayerBox = ( {name, color, remove, edit} ) => {
  const [editTrains, setEditTrains] = React.useState(false)
  const [editTickets, setEditTickets] = React.useState(false)
  const [editOthers, setEditOthers] = React.useState(false)
  const [trains, setTrains] = React.useState([])
  const [tickets, setTickets] = React.useState([])
  const [others, setOthers] = React.useState({
    stations: 0,
    globetrotter: false,
    road: false,
  })

  const trainsScore = (
    trains.length != 0 
    ? trains
      .map(train => trainsMap[train])
      .reduce((train, sum) => sum + train) : 0
  )
  const ticketsScore = (
    tickets.length !=0 
    ? tickets
      .reduce((ticket, sum = 0) => sum + ticket ) : 0
  )

  const stationsScore = others.stations * settings.station
  const globetrotterScore = others.globetrotter ? settings.globetrotter : 0
  const roadScore = others.road ? settings.road : 0
  const othersScore = stationsScore + globetrotterScore + roadScore

  const sum = trainsScore + ticketsScore + othersScore

  return (
  <div className="player" style={{boxShadow: `0px 0px 20px ${color}`}}>
    { editTrains && 
      <EditTrains 
        trains={trains} 
        setTrains={setTrains} 
        visibility={setEditTrains} 
        color={color}
      /> 
    }
    { editTickets && 
      <EditTickets 
        tickets={tickets} 
        setTickets={setTickets} 
        visibility={setEditTickets} 
        color={color}
      /> 
    }
    { editOthers && 
      <EditOthers 
        others={others} 
        setOthers={setOthers} 
        visibility={setEditOthers} 
        color={color}
      /> 
    }
    <div className="player_icons">
      <div onClick={remove}><i className="fa fa-trash" /></div>
      <div onClick={edit}><i className="fa fa-edit" /></div> 
    </div>
    <div className="player_name">{name}</div>

    <div className="player_row">
      <div>Pociągi:</div>
      <div className="player_score">{trainsScore}</div>
      <div className="player_edit" onClick={() => setEditTrains(true)}><i className="fa fa-edit" /></div>
    </div>
    <div className="player_row">
      <div>Bilety:</div>
      <div className="player_score">{ticketsScore}</div>
      <div className="player_edit" onClick={() => setEditTickets(true)}><i className="fa fa-edit" /></div>
    </div>
    <div className="player_row">
      <div>Inne:</div>
      <div className="player_score">{othersScore}</div>
      <div className="player_edit" onClick={() => setEditOthers(true)}><i className="fa fa-edit" /></div>
    </div>
    <div className="player_row">
      <div className="player_sum">Suma:</div>
      <div className="player_sum player_score">{sum}</div>
    </div>
  </div>
  )
}

const PlayerForm = ({ mode, player, setPlayer, onClick}) => {
   React.useEffect(() => {
    ref.current.focus();
  }, []);
  
  const ref = React.useRef(null);
  const handleEnter = (e) => {
    if(e.key =="Enter") onClick()
  }
  return (
    <div className="players_form">

      <select 
        value={player.color} 
        onKeyUp={handleEnter}
        onChange={e => setPlayer({...player, color: e.target.value})}>
          <option value="black">Czarny</option>
          <option value="red">Czerwony</option>
          <option value="dodgerblue">Niebieski</option>
          <option value="green">Zielony</option>
          <option value="yellow">Żółty</option>
      </select>

      <input 
        ref={ref} 
        tabIndex={0} 
        type="text" 
        placeholder="Wpisz imię gracza"
        value={player.name} 
        onChange={e => setPlayer({...player, name: e.target.value})}
        onKeyUp={handleEnter}
      />

      <div className="players_buttons">
        {mode === "add" ? (
          <button onClick={onClick}>Dodaj gracza</button>
        ) : (
         <button onClick={onClick}>Aktualizuj gracza</button>
        )}
      </div>
  </div>
  )
}

// App
const App = () => {
  const [modalInfo, setModalInfo] = React.useState("Error!")
  const [modalVisibility, setModalVisibility] = React.useState(false);
  const [newPlayer, setNewPlayer] = React.useState({name: "", color: "black"})
  const [editingPlayer, setEditingPlayer] = React.useState({});
  const [players, setPlayers] = React.useState([])

  const handleAddPlayer = () => {
    if(! newPlayer.name) {
      setModalInfo("Wprowadź imię gracza!")
      setModalVisibility(true)
    } else if (players.find(player => player.name == newPlayer.name)) {
      setModalInfo("Imię nie może się powtarzać!")
      setModalVisibility(true)
    } else {
      newPlayer.id = lastID
      lastID++
      const sortedPlayers = [...players, newPlayer]
      .sort((a, b) => a.name.localeCompare(b.name));
      setNewPlayer({name: "", color: "black"})
      setPlayers(sortedPlayers)
    }
  }

  const handleEditPlayer = (id) => () => {
    const player = players.find(player => player.id == id)
    setEditingPlayer(player)
  }

  const handleUpdatePlayer = () => {
    if (! editingPlayer.name) {
      setModalInfo("Wprowadź imię gracza!")
      setModalVisibility(true)
      return;
    }
    setPlayers(players
      .map((player) => player.id === editingPlayer.id ? editingPlayer : player)
      .sort((a, b) => a.name.localeCompare(b.name))
    )
    setEditingPlayer({})
  };

  const handleRemovePlayer = (id) => () => {
    setPlayers(players.filter(player => player.id != id))
  }

  return (
    <div className="container">
      <div className="container_app">
        { modalVisibility && 
          <Modal info={modalInfo} visibility={setModalVisibility} /> 
        }
        <div className="header">
          <h1>Ticket to Ride Calculator</h1>
        </div>
        <div className="players">

          {/* PlayerForm */}
          {!editingPlayer.id ? (
          // add mode
          <PlayerForm
            mode="add"
            player={newPlayer}
            setPlayer={setNewPlayer}
            onClick={handleAddPlayer}
          />
          ) : (
          // edit mode
          <PlayerForm
            mode="edit"
            player={editingPlayer}
            setPlayer={setEditingPlayer}
            onClick={handleUpdatePlayer}
          />
          )}

          {/* PlayerBox */}
          {players.length != 0 && (
          <div className="players_list">
            {players.map(player => (
              <PlayerBox 
                key={player.id} 
                name={player.name}
                color={player.color}
                remove={handleRemovePlayer(player.id)}
                edit={handleEditPlayer(player.id)}
              />)
            )}
          </div>
          )}
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
document.getElementById('root'))