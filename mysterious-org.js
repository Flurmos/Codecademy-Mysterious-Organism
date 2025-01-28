// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

// Factory function for the specimens
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      let newBase = returnRandBase();
      let mutateIndex =  Math.floor(Math.random() * 15);
      while (this.dna[mutateIndex] === newBase) {
        newBase = returnRandBase();
        mutateIndex =  Math.floor(Math.random() * 15);
      }
      this.dna[mutateIndex] = newBase;
      return this.dna;
    },
    compareDNA(specimen) {
      let tally = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === specimen.dna[i]) {
          tally++;
        }
      }
      console.log('Specimens have ' + (Math.floor(tally / this.dna.length * 100)) + '% DNA in common');
    },
    willLikelySurvive() {
      let tally = 0;
      for (base of dna) {
        if (base === 'C' || base === 'G') {
          tally++;
        }
      }
      return ((tally / this.dna.length * 100) >= 60) ? true : false;
    }
  }
}

// Makes an array of specimens that meet the requirements to have a good chance at surviving
const gatherSpecimens = () => {
  const specimenArray = [];
  for (i = 0; i < 30; i++) {
    const newSpecimen = pAequorFactory(i+1, mockUpStrand());
    while (!newSpecimen.willLikelySurvive()) {
      newSpecimen.mutate();
    }
    specimenArray.push(newSpecimen);
  }
  return specimenArray;
}

// Verifies that all specimens in an array meet survival likelyhood requirements
const testSpecimens = (specimens) => {
  for (specimen in specimens) {
    console.log(specimens[specimen].willLikelySurvive());
  }
}

const specimenArray = gatherSpecimens();
testSpecimens(specimenArray);
console.log(specimenArray);
