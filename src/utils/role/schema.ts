const roleSchema: Schema = {
  mafia: {
    value: '잔혹한 마피아',
    url: 'https://full-oil.pockethost.io/api/files/k030rt6lckc3uzs/gfmbyr01oephm4p/1294795_w9cHIV9mfY.svg?thumb=100x100&token=',
  },

  citizen: {
    value: '평범한 시민',
    url: 'https://full-oil.pockethost.io/api/files/k030rt6lckc3uzs/z1hexyu2bkgc6of/654132_Y2wSUvbaU5.svg?thumb=100x100&token=',
  },
};

export default roleSchema;

interface Schema {
  mafia: Role;
  citizen: Role;
}

interface Role {
  value: string;
  url: string;
}
