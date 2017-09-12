
// Simple way of splitting up dice sets from a giant string
const dicesets = `
# Classic 4x4
AACIOT  
ABILTY  
ABJMOQu 
ACDEMP  
ACELRS  
ADENVZ  
AHMORS  
BIFORX  
DENOSW  
DKNOTU  
EEFHIY  
EGKLUY  
EGINTV  
EHINPS  
ELPSTU  
GILRUW  

# New 4x4
AAEEGN
ABBJOO
ACHOPS
AFFKPS
AOOTTW
CIMOTU
DEILRX
DELRVY
DISTTY
EEGHNW
EEINSU
EHRTVW
EIOSST
ELRTTY
HIMNUQu
HLNNRZ

# Original 5x5
AAAFRS
AAEEEE
AAFIRS
ADENNN
AEEEEM
AEEGMU
AEGMNN
AFIRSY
BJKXZQu
CCENST
CEIILT
CEIPST
DDHNOT
DHHLOR
DHHLOR
DHLNOR
EIIITT
CEILPT
EMOTTT
ENSSSU
FIPRSY
GORRVW
IPRRRY
NOOTUW
OOOTTU

# Challenge 5x5
AAAFRS
AAEEEE
AAFIRS
ADENNN
AEEEEM
AEEGMU
AEGMNN
AFIRSY
BJKQuXZ
CCENST
CEIILT
CEIPST
DDHNOT
DHHLOR
IKLMQuU
DHLNOR
EIIITT
CEILPT
EMOTTT
ENSSSU
FIPRSY
GORRVW
IPRRRY
NOOTUW
OOOTTU

# Deluxe 5x5
AAAFRS
AAEEEE
AAFIRS
ADENNN
AEEEEM
AEEGMU
AEGMNN
AFIRSY
BJKQuXZ
CCNSTW
CEIILT
CEIPST
DDLNOR
DHHLOR
DHHNOT
DHLNOR
EIIITT
CEILPT
EMOTTT
ENSSSU
FIPRSY
GORRVW
HIPRRY
NOOTUW
OOOTTU

# 2012 5x5
AAAFRS
AAEEEE
AAFIRS
ADENNN
AEEEEM
AEEGMU
AEGMNN
AFIRSY
BBJKXZ
CCENST
EIILST
CEIPST
DDHNOT
DHHLOR
DHHNOW
DHLNOR
EIIITT
EILPST
EMOTTT
ENSSSU
QuInThErHeAn
GORRVW
IPRSYY
NOOTUW
OOOTTU
`

// To clean up whitespace
const trim = (str) => {
  return str.replace(/^\s+|\s+$/g, '');
}

// Do some parsing here to change the giant string into an object
export default dicesets.split('#').filter(dl => trim(dl)).reduce((acc, dl) => {
  const splat = trim(dl).split('\n');
  const name = trim(splat[0]);
  splat.forEach((item, index)=>{
    // First index create new array in dictionary
    if (index === 0) acc[name] = [];
    // Every other index we want to split into array of arrays
    if (index !== 0) acc[name].push(trim(item).replace(/([a-zA-Z](?=[A-Z]))/g, '$1 ').split(' '))
  })
  return acc
}, {});
