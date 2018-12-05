const MyTeam = {
    size:2,
    Owner:'Fatema',
    Cowner:'Kazi Lakit'
}


function* getTeamMember(member){
    yield member.Owner;
} 

const getTheMember = getTeamMember(MyTeam);
console.log(getTheMember.next());