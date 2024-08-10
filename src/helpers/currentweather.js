const updateData = () => {
    fetch('https://api.synopticdata.com/v2/stations/latest?&stid=F6791&units=english,speed|mph,pres|mb&recent=1440&24hsummary=1&qc_remove_data=off&qc_flags=on&qc_checks=all&hfmetars=1&showemptystations=1&precip=1&timeformat=%H:%M&obtimezone=local&token=dbdc2dba77634cb99cd8969c2a75d708')
    .then (res=> {
      return res.json();
    })
    .then(data=> {
      console.log("Sent", data)
    }) 
}

export default updateData;


