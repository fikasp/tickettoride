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

// EditTrains
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
        className="edit_content edit_content-trains"
        onKeyDown={handleKeyDown} 
        style={{boxShadow: `0px 0px 20px ${color}`}}>
          
        <div className="edit_title">Lista pociągów</div>

        <div className="edit_close" onClick={handleClose}>
          <i className="fa fa-check"/>
        </div>

        <div className="edit_reset" onClick={handleReset}>
          <i className="fa fa-trash"/>
          {trainList.length !=0 ? trainList.reduce((train, sum) => train + sum): 0}
        </div>

        <div className="trains">
          {trainList.map((train, index) => (
            <div key={index} className="trains_item">
              <div>{train}</div>
              <div onClick={handleRemoveTrain(index)}>
                <i className="fa fa-trash" />
              </div>
            </div>
          ))}   
        </div>

        <div className="trains_buttons">
          {keys.map(key => (
            <button className="trains_button" key={key} onClick={handleAddTrain}>{key}</button>
          ))}
        </div>

      </div>
  </div>
  )
}

// EditTickets
const EditTickets = ({ tickets, setTickets, visibility, color }) => {
  React.useEffect(() => {
    ref.current.focus();
  }, []);

  const ref = React.useRef(null);
  const modalInfo = "Wprowadź liczbę całkowitą w przedziale od 1 do 25!"
  const [modalVisibility, setModalVisibility] = React.useState(false);
  const [ticketList, setTicketList] = React.useState(tickets)
  const [newTicket, setNewTicket] = React.useState("")

  const handleKeyDown = (e) => {
    console.log(e.key);
    if(e.key =="-") {
      handleAddTicket("-")
    } 
    else if(e.key =="+" || e.key =="Enter") {
      handleAddTicket("+")
    } 
    else if (e.key == "Escape") {
      handleClose()
    }
  }
  const handleAddTicket = (sign) => {
    if(newTicket < 1 || newTicket > 25) {
      setModalVisibility(true)
    } else {
      const ticket = sign == "-" ? Number(newTicket) * (-1) : Number(newTicket)
      setTicketList([...ticketList, ticket])
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

        <div className="edit_close" onClick={handleClose}>
          <i className="fa fa-check"/>
        </div>

        <div className="edit_reset" onClick={handleReset}>
          <i className="fa fa-trash"/>
          {ticketList.length !=0 ? ticketList.length: 0}
        </div>

        <div className="tickets">
          {ticketList.map((ticket, index) => (
            <div key={index} className={`tickets_item${ticket > 0 ? "" : " tickets_item-red"}`}>
              <div>{ticket}</div>
              <div onClick={handleRemoveTicket(index)}>
                <i className="fa fa-trash" />
              </div>
            </div>
          ))}       
        </div>

        <div className="tickets_group">
          <input
            ref={ref} 
            tabIndex={0} 
            className="tickets_button"
            type="number"
            min="1"
            max="25" 
            placeholder="1 ... 25"
            value={newTicket} 
            onChange={e => setNewTicket(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="tickets_buttons">
            <button className="tickets_button" onClick={() => handleAddTicket("+")}>Dodaj bilet ukończony</button>
            <button className="tickets_button" onClick={() => handleAddTicket("-")}>Dodaj bilet nieukończony</button>
          </div>
        </div>

      </div>
  </div>
  )
}

// EditBonus
const EditBonus = ({ others, setOthers, visibility, color }) => {
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
        onKeyDown={handleKeyDown}
        className="edit_content edit_content-others"
        style={{boxShadow: `0px 0px 20px ${color}`}}>

        <div className="edit_title">Lista bonusów</div>
        <div className="edit_close" onClick={handleClose}>
          <i className="fa fa-check"/>
        </div>

        <div className="bonus">

          <label htmlFor="stations">Niewykorzystane stacje:</label>
          <select 
            ref={ref} 
            id="stations"
            className="bonus_select" 
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
            className="bonus_checkbox" 
            checked={road} 
            onChange={e => setRoad(e.target.checked)}
          />

          <label htmlFor="glob">Globetrotter:</label>
          <input 
            id="glob" 
            type="checkbox" 
            className="bonus_checkbox" 
            checked={globetrotter} 
            onChange={e => setGlobetrotter(e.target.checked)}
          />

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
      <EditBonus 
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
      <div className="player_row-info">Pociągi:</div>
      <div className="player_row-score">{trainsScore}</div>
      <div className="player_row-edit" onClick={() => setEditTrains(true)}><i className="fa fa-edit" /></div>
    </div>
    <div className="player_row">
      <div className="player_row-info">Bilety:</div>
      <div className="player_row-score">{ticketsScore}</div>
      <div className="player_row-edit" onClick={() => setEditTickets(true)}><i className="fa fa-edit" /></div>
    </div>
    <div className="player_row">
      <div className="player_row-info">Bonusy:</div>
      <div className="player_row-score">{othersScore}</div>
      <div className="player_row-edit" onClick={() => setEditOthers(true)}><i className="fa fa-edit" /></div>
    </div>
    <div className="player_row">
      <div className="player_row-info player_sum">Suma:</div>
      <div className="player_row-score player_sum">{sum}</div>
    </div>
  </div>
  )
}

// PlayerForm
const PlayerForm = ({ mode, player, setPlayer, onClick}) => {
  
  const handleEnter = (e) => {
    if(e.key =="Enter") onClick()
  }
  return (
    <>
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
        type="text" 
        placeholder="Wpisz imię gracza"
        value={player.name} 
        onChange={e => setPlayer({...player, name: e.target.value})}
        onKeyUp={handleEnter}
      />

      <div className="form_buttons">
        {mode === "add" ? (
          <button className="form_button" onClick={onClick}>Dodaj gracza</button>
        ) : (
          <button className="form_button" onClick={onClick}>Aktualizuj gracza</button>
        )}
      </div>
  </>
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

        {/* Header */}
        <div className="header">
          <h1>Ticket to Ride Calculator</h1>
        </div>

        {/* Form */}
        <div className="form">
          {!editingPlayer.id ? (
          <PlayerForm
            mode="add"
            player={newPlayer}
            setPlayer={setNewPlayer}
            onClick={handleAddPlayer}
          />
          ) : (
          <PlayerForm
            mode="edit"
            player={editingPlayer}
            setPlayer={setEditingPlayer}
            onClick={handleUpdatePlayer}
          />
          )}
        </div>

        {/* Main */}
        {players.length != 0 && (
        <div className="main">
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

        {/* Modal */}
        { modalVisibility && 
          <Modal info={modalInfo} visibility={setModalVisibility} /> 
        }
        
      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
document.getElementById('root'))