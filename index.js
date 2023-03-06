let lastID = 1

const colors = {
  black: "black",
  red: "red",
  blue: "DodgerBlue",
  green: "green",
  yellow: "yellow",
}

const settings = {
  road: 10,
  globetrotter: 15,
  station: 4,
  trains: {
    1 : 1,
    2 : 2,
    3 : 4,
    4 : 7,
    5 : 10,
    6 : 15,
    7 : 18,
    8 : 21,
  },
}

const initPlayers = [
  {id: 1, name: "Michał", color: colors.red, score: 0},
  {id: 2, name: "Tata", color: colors.green, score: 0},
  {id: 3, name: "Weronika", color: colors.blue, score: 0},
  {id: 4, name: "Agnieszka", color: colors.yellow, score: 0},
  {id: 5, name: "Przemek", color: colors.black, score: 0},
]

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


// Scores
const Scores = ({ players, visibility }) => {
  React.useEffect(() => {
    ref.current.focus();
  }, [])

  const ref = React.useRef(null);

  const setClassName = (place) => {
    let className = "scores_row"
    if (place == 1) {
      className += " scores_row-first"
    } else if (place == 2) {
      className += " scores_row-second"
    } else if (place == 3) {
      className += " scores_row-third"
    } 
    console.log(className);
    return className
  }

  const handleKeyDown = (e) => {
    if (e.key == "Escape" || e.key == "Enter") {
      visibility(false)
    }
  }

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)
  let lastScore = null
  let place = 1

  const playersWithPlaces = sortedPlayers.map((player, index) => {
    if (player.score !== lastScore) {
      lastScore = player.score
      place = index + 1
    }
    return {...player, place}
  })

  return (
    <div className="modal" style={{zIndex:1}}>
      <div 
        ref={ref}
        tabIndex={0} 
        className="modal_content modal_content-score" 
        onKeyDown={handleKeyDown} 
      >
      <div className="scores">
        <div className="scores_row scores_row-header">
          <div className="scores_place">Miejsce</div>
          <div className="scores_name">Gracz</div>
          <div className="scores_score">Punkty</div>
        </div>
        {playersWithPlaces.map((player) => (
        <div key={player.id} className={setClassName(player.place)}>
          <div className="scores_place">{player.place}</div>
          <div className="scores_name">{player.name}</div>
          <div className="scores_score">{player.score}</div>
        </div>
        ))}
      </div>

        <div className="modal_close" onClick={() => visibility(false)}>
          <i className="fa fa-close"/>
        </div>
      </div>
    </div>
)}

// EditTrains
const EditTrains = ({ trains, setTrains, setTrainsScore, visibility, color }) => {
  React.useEffect(() => {
    ref.current.focus();
  }, []);

  const ref = React.useRef(null);
  const keys = Object.keys(settings.trains)
  const [trainList, setTrainList] = React.useState(trains)

  const trainsScore = (
    trainList.length != 0 
    ? trainList
      .map(train => settings.trains[train])
      .reduce((train, sum) => sum + train) 
    : 0
  )

  const handleKeyDown = (e) => {
    if(keys.find(key => key == e.key)) {
      setTrainList([...trainList, Number(e.key)])
    } else if (e.key == "Enter" || e.key == "Escape") {
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
    setTrainsScore(trainsScore)
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
          <span className="edit_score">{trainsScore}</span>
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
const EditTickets = ({ tickets, setTickets, setTicketsScore, visibility, color }) => {
  React.useEffect(() => {
    ref.current.focus();
  }, []);

  const ref = React.useRef(null);
  const modalInfo = "Wprowadź liczbę całkowitą w przedziale od 1 do 25!"
  const [modalVisibility, setModalVisibility] = React.useState(false);
  const [ticketList, setTicketList] = React.useState(tickets)
  const [newTicket, setNewTicket] = React.useState("")

  const ticketsScore = (
    ticketList.length !=0 
    ? ticketList
      .reduce((ticket, sum = 0) => sum + ticket ) 
    : 0
  )

  const handleKeyDown = (e) => {
    if(e.key =="-") {
      e.preventDefault()
      handleAddTicket("-")
    } 
    else if(e.key =="+") {
      e.preventDefault()
      handleAddTicket("+")
    } 
    else if (e.key == "Escape" || e.key == "Enter") {
      handleClose()
    }
  }
  const handleOnChange = (e) => {
    if(e.key !="-" || e.key !="+") {
    setNewTicket(e.target.value)
  }}

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
    setTicketsScore(ticketsScore)
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
        className="edit_content edit_content-tickets"
        onKeyDown={handleKeyDown}
        style={{boxShadow: `0px 0px 20px ${color}`}}>

        <div className="edit_title">Lista biletów</div>

        <div className="edit_close" onClick={handleClose}>
          <span className="edit_score">{ticketsScore}</span>
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
            onChange={handleOnChange}
            onKeyDown={handleKeyDown}
          />
          <div className="tickets_buttons">
            <button className="tickets_button tickets_button-done" onClick={() => handleAddTicket("+")}>Bilet ukończony</button>
            <button className="tickets_button tickets_button-failed" onClick={() => handleAddTicket("-")}>Bilet nieukończony</button>
          </div>
        </div>

      </div>
  </div>
  )
}

// EditBonus
const EditBonus = ({ bonus, setBonus, setBonusScore, visibility, color }) => {
  React.useEffect(() => {
    ref.current.focus();
  }, []);

  const ref = React.useRef(null);
  const [stations, setStations] = React.useState(bonus.stations)
  const [globetrotter, setGlobetrotter] = React.useState(bonus.globetrotter)
  const [road, setRoad] = React.useState(bonus.road)

  const stationsScore = stations * settings.station
  const globetrotterScore = globetrotter ? settings.globetrotter : 0
  const roadScore = road ? settings.road : 0
  const bonusScore = stationsScore + globetrotterScore + roadScore

  const handleKeyDown = (e) => {
    if (e.key == "Escape" || e.key =="Enter") {
      handleClose()
    }
  }
  const handleClose = () => {
    setBonus({
      stations: stations, 
      globetrotter: globetrotter,
      road: road
    })
    setBonusScore(bonusScore)
    visibility(false)
  }

  return (
    <div className="edit">
      <div 
        onKeyDown={handleKeyDown}
        className="edit_content edit_content-bonus"
        style={{boxShadow: `0px 0px 20px ${color}`}}>

        <div className="edit_title">Lista bonusów</div>
        <div className="edit_close" onClick={handleClose}>
          <span className="edit_score">{bonusScore}</span>
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
const PlayerBox = ( {color, edit, name, remove, score, updateScore} ) => {
  React.useEffect(() => {
    if (score == 0) {
      setTrains([])
      setTrainsScore(0)
      setTickets([])
      setTicketsScore(0)
      setBonus(initialBonus)
      setBonusScore(0)
    }
  },[score])

  const initialBonus = {
    stations: 0,
    globetrotter: false,
    road: false,
  }

  // trains
  const [trains, setTrains] = React.useState([])
  const [trainsScore, setTrainsScore] = React.useState(0)
  const [editTrains, setEditTrains] = React.useState(false)

  // tickets
  const [tickets, setTickets] = React.useState([])
  const [ticketsScore, setTicketsScore] = React.useState(0)
  const [editTickets, setEditTickets] = React.useState(false)

  // bonus
  const [bonus, setBonus] = React.useState(initialBonus)
  const [bonusScore, setBonusScore] = React.useState(0)
  const [editBonus, setEditBonus] = React.useState(false)
  
  // sum
  const sum = trainsScore + ticketsScore + bonusScore

  React.useEffect(() => {
    updateScore(sum)
  },[sum])

  return (
  <div className="player" style={{boxShadow: `0px 0px 20px ${color}`}}>
    { editTrains && 
      <EditTrains 
        trains={trains} 
        setTrains={setTrains} 
        setTrainsScore={setTrainsScore}
        visibility={setEditTrains} 
        color={color}
      /> 
    }
    { editTickets && 
      <EditTickets 
        tickets={tickets} 
        setTickets={setTickets} 
        setTicketsScore={setTicketsScore} 
        visibility={setEditTickets} 
        color={color}
      /> 
    }
    { editBonus && 
      <EditBonus 
        bonus={bonus} 
        setBonus={setBonus} 
        setBonusScore={setBonusScore} 
        visibility={setEditBonus} 
        color={color}
      /> 
    }
    <div className="player_remove" onClick={remove}><i className="fa fa-trash" /></div>
    <div className="player_edit" onClick={edit}><i className="fa fa-edit" /></div> 
    <div className="player_name">{name}</div>

    <div className="player_row">
      <div className="player_row-info">Bilety:</div>
      <div className="player_row-score">{ticketsScore}</div>
      <div className="player_row-edit" onClick={() => setEditTickets(true)}><i className="fa fa-edit" /></div>
    </div>

    <div className="player_row">
      <div className="player_row-info">Pociągi:</div>
      <div className="player_row-score">{trainsScore}</div>
      <div className="player_row-edit" onClick={() => setEditTrains(true)}><i className="fa fa-edit" /></div>
    </div>

    <div className="player_row">
      <div className="player_row-info">Bonusy:</div>
      <div className="player_row-score">{bonusScore}</div>
      <div className="player_row-edit" onClick={() => setEditBonus(true)}><i className="fa fa-edit" /></div>
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
  React.useEffect(() => {
    ref.current.focus();
  }, [player]);

  const ref = React.useRef(null);

  const handleEnter = (e) => {
    if(e.key =="Enter") {
      onClick()
    }
  }
  return (
    <>
      <select 
        value={player.color} 
        className="form_button" 
        onKeyUp={handleEnter}
        onChange={e => setPlayer({...player, color: e.target.value})}>
          <option value={colors.black}>Czarny</option>
          <option value={colors.red}>Czerwony</option>
          <option value={colors.blue}>Niebieski</option>
          <option value={colors.green}>Zielony</option>
          <option value={colors.yellow}>Żółty</option>
      </select>

      <input 
        ref={ref} 
        type="text" 
        placeholder="Wpisz imię gracza"
        className="form_button" 
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
  const [scoresVisibility, setScoresVisibility] = React.useState(false);
  const [newPlayer, setNewPlayer] = React.useState({name: "", color: "black"})
  const [editingPlayer, setEditingPlayer] = React.useState({});
  const [players, setPlayers] = React.useState([])
  const container = React.useRef(null)

  console.log(players);

  const handleStart = () => {
    setPlayers(initPlayers)
    lastID = (initPlayers.length)+1
  }

  const handleEnd = () => {
    setScoresVisibility(true)
  }

  const handleAddPlayer = () => {
    if(! newPlayer.name) {
      setModalInfo("Wprowadź imię gracza!")
      setModalVisibility(true)
    } 
    else if (players.find(player => player.name == newPlayer.name)) {
      setModalInfo("Imię nie może się powtarzać!")
      setModalVisibility(true)
    } 
    else {
      newPlayer.id = lastID
      newPlayer.score = 0
      lastID++
      // const sortedPlayers = [...players, newPlayer]
      // .sort((a, b) => a.name.localeCompare(b.name));
      setNewPlayer({name: "", color: "black"})
      setPlayers([...players, newPlayer])
    }
  }

  const handleEditPlayer = (id) => () => {
    const player = players.find(player => player.id == id)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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
      // .sort((a, b) => a.name.localeCompare(b.name))
    )
    setEditingPlayer({})
  };

  const handleRemovePlayer = (id) => () => {
    setPlayers(players.filter(player => player.id != id))
  }

  const handleUpdateScore = (id, score) => {
    setPlayers(players
      .map(player => player.id === id ? {...player, score: score} : player)
    )
  }

  return (
    <div className="container">
      <div ref={container} className="container_app">

        {/* Header */}
        <div className="header">
          <div className="header_start" onClick={handleStart}>
            <i className="fa fa-solid fa-bolt"></i>
          </div>
          <div className="header_title">
            <h1>Ticket to Ride Calculator 1.2</h1>
          </div>
          <div className="header_end" onClick={handleEnd}>
            <i className="fa fa-solid fa-flag"></i>
          </div>
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
              score={player.score}
              updateScore={(score) => handleUpdateScore(player.id, score)}
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

        {/* Scores */}
        { scoresVisibility && 
          <Scores players={players} visibility={setScoresVisibility} /> 
        }
        
      </div>
      <div className="footer">ARWcode &copy; 2023</div>
    </div>
  )
}

ReactDOM.render(<App />, 
document.getElementById('root'))