const MyTeam = {
    size:2,
    Owner:'Fatema',
    Cowner:'Kazi Lakit'
}

//console.log(Date.now());
//console.log(Date.now()+6000);
console.log(Date.now()/1000)

function* getTeamMember(member){
    yield member.Owner;
} 

const getTheMember = getTeamMember(MyTeam);
console.log(getTheMember.next());