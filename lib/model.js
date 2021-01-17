function PetRepo() {
  this.pets = [
    {
      id: 1,
      petName: "Bernese Mountain Dog",
      type: "Dog",
      price: 2500.0,
      description: "House security dog. Weight 40Kg, Height 24inch ",
      picture: "Images/bmd.jpg"
    },
    {
      id: 2,
      petName: "German Shepherd",
      type: "Dog",
      price: 3500.0,
      description: "Most popular pet dog, Weight 38Kg, Height 27Inch",
      picture: "Images/gsd.jpg"
    },
    {
      id: 3,
      petName: "Abysinnian Cat",
      type: "Cat",
      price: 2500.0,
      description: "Colorful cat with a distinctly red colored far",
      picture: "Images/abc.jpg"
    }
  ];
  this.get = (id)=>{
    var data= this.pets.filter(p=> p.id == id);
   /*  console.log(id);
    console.log(x);
    return x; */
    if(data && data.length) return data[0];
    else return null;
  }
  this.insert = pet => {
    this.pets.push(pet);
  };
  this.update = (id, pet) => {
    var data= this.pets.filter(p=> p.id == id);
    if(data || data.length)
    {
      data[0].petName=pet.petName;
      data[0].price = Number(pet.price);
      data[0].type = pet.type;
      data[0].description = pet.description;
      console.log(this.pets);
    }
  };
}
module.exports.model = new PetRepo();
