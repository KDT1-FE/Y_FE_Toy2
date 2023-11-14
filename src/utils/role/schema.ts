const roleSchema: Schema = {
  mafia: {
    value: '잔혹한 마피아',
    url: 'https://full-oil.pockethost.io/api/files/5who7j8fggfy5vg/xjsq07tgbal6nig/ghost03_rqjVVXsK4T.svg?token=',
  },

  citizen: {
    value: '평범한 시민',
    url: 'https://full-oil.pockethost.io/api/files/5who7j8fggfy5vg/4jxzes84edcot7s/ghost08_Kl9fdFNmW1.svg?thumb=100x100&token=',
  },

  doctor: {
    value: '의사',
    url: 'https://full-oil.pockethost.io/api/files/5who7j8fggfy5vg/iv21q3nx88kwlv1/ghost06_sWaSrIxhmF.svg?thumb=100x100&token=',
  },
};

export default roleSchema;

interface Schema {
  mafia: Role;
  citizen: Role;
  doctor: Role;
}

interface Role {
  value: string;
  url: string;
}
