//RECUPERATION DES DONNEES DANS LE FICHIER .JSON
alert("Le contenu pourrais-ne pas se charger correctement sans Live Server");
const reponse= await fetch("online_store_extended.json");
const informations=await reponse.json();
const catalog=document.querySelector(".catalogue");
//FONCTION POUR GENERER LES PRODUITS AFIN D'EVITER LA REPETITION DE CREATION D'ELEMENT
function genererProduits(produits)
{
    for(let i=0;i<produits.length;i++)
    {
        //CREATION D'UNE BALISE ARTICLE POUR METTRE UN PRODUIT
        const article=document.createElement('article')
        //POUR L'IMAGE DU PRODUIT
        const image=document.createElement('img');
        image.src=produits[i].image;
        article.appendChild(image);
        //POUR LE NOM DU PRODUIT
        const name=document.createElement('h3');
        name.innerText=produits[i].name;
        article.appendChild(name);
        //POUR LE PRIX DU PRODUIT
        const price=document.createElement('p');
        price.innerText=produits[i].price;
        article.appendChild(price);
        //POUR LES BOUTONS
        const bouton=document.createElement('div');
        bouton.className="boutons";
        const hiddenQuantity=document.createElement('div');
        hiddenQuantity.innerHTML=`  <div class="quantity" style="display: none;">
        <input type="number" class=subQuantity value="1" min="1">
    </div>
`
        article.appendChild(hiddenQuantity);
        //AJOUTER AU PANIER
        const panier=document.createElement('button');
        panier.innerText="Ajouter au panier";
        bouton.appendChild(panier);
        panier.addEventListener('click',function(){
            ajouterPanier(produits[i]);
        })
        //DETAILS DU PRODUIT
        const details=document.createElement('button');
        details.innerText="Details";
        details.classList="moreInfo";
        details.addEventListener('click',function(){
            afficherDetailProduits(produits[i]);
        })        
        bouton.appendChild(details);
        article.appendChild(bouton);
        catalog.appendChild(article);
        
    }
    document.querySelector('.details').classList.remove('detailStyle');
}
//FONCTION QUI EFFACE LE CONTENU D'UNE BLOC
function eraseContent(catalog){
    catalog.innerHTML="";
}alert("Le contenu pourrais-ne pas se charger correctement sans Live Server");
//SELECTION DES PRODUITS
var allProducts=informations.products;
genererProduits(allProducts);
//BARRE DE RECHERCHE
document.querySelector('.search').addEventListener('submit',function(){
    event.preventDefault();
    const motCle=document.querySelector("#key").value;
    const filtreSearch=allProducts.filter(allProducts => allProducts.name===motCle);
    eraseContent(catalog);
    eraseContent(sectionDetails);
    genererProduits(filtreSearch);
})

//CATEGORIE
const category=informations.categories
const navigation=document.querySelector('.menuItems')
for(let i=0;i<category.length;i++){
    const categorie=document.createElement('div');
    categorie.classList="largeNav"
    categorie.innerText=category[i]['name'];
    navigation.appendChild(categorie);
    categorie.addEventListener('click',function(){
        const filtreCategorie=allProducts.filter(allProducts=>allProducts['categoryId']===category[i]["id"]);
        eraseContent(catalog);
        eraseContent(sectionDetails);
        genererProduits(filtreCategorie);
    })
}

//DETAILS PRODUITS
const sectionDetails=document.querySelector(".details");
function afficherDetailProduits(produits){
    eraseContent(catalog);
    eraseContent(sectionDetails);
    sectionDetails.classList.add('detailStyle');
    /*DEUX COLONNES*/
    //PREMIER COLONNES
    const firstColumn=document.createElement('div');
    firstColumn.classList="detail1";
    const image=document.createElement('img');
    image.src=produits.image;
    firstColumn.appendChild(image);
    var name=document.createElement('h2');
    name.innerText=produits.name;
    firstColumn.appendChild(name);
    sectionDetails.appendChild(firstColumn);
    //DEUXIEME COLONNES
    const secondColumn=document.createElement('div');
    secondColumn.classList="detail2";
    name=document.createElement('h2');
    name.innerText=produits.name;
    secondColumn.appendChild(name);
    const prix=document.createElement('h3');
    prix.innerText=produits.price;
    secondColumn.appendChild(prix);
    //TAILLE
    const taille=document.createElement('p');
    taille.innerText="Taille:"
    const tailleDispo=produits.attributes.size;
    taille.innerHTML+=`
    <select  id="size">
    </select>
    `
    secondColumn.appendChild(taille);
    sectionDetails.appendChild(secondColumn);   
    const size=document.querySelector("#size")
    for(let i=0;i<tailleDispo.length;i++){
        size.innerHTML+=`<option value="${tailleDispo[i]}">${tailleDispo[i]}</option>`
    }
    //COULEUR
    const color=produits.attributes.color;
    const colorSection=document.createElement('p');
    colorSection.innerText="Couleur disponible: ";
    colorSection.innerHTML+=`
    <select  id="color">
    </select>
    `
    secondColumn.appendChild(colorSection); 
    const couleur=document.querySelector("#color");
    for(let i=0;i<color.length;i++){
        couleur.innerHTML+=`<option value="${color[i]}">${color[i]}</option>`
    }; 
    const description =document.createElement('p');
    description.innerText=produits.description;
    secondColumn.appendChild(description);
    secondColumn.innerHTML+=`
                <div class="quantity">
                    <input type="number" class=subQuantity value="1" min="1" max="${produits.stock}">
                </div>
    `
    //PANIER
    const panier=document.createElement('button');
    panier.innerText="Ajouter au panier";
    panier.addEventListener('click',function(){
        ajouterPanier(produits);
    })
    secondColumn.appendChild(panier);
    
 
}
//HAMBURGER
const hamburger=document.querySelector(".hamburger")
hamburger.addEventListener('click',function()
{   
    document.querySelector(".menuItems").classList.toggle("hamburgerItems");
    const menu=document.querySelectorAll(".largeNav")
    for(let i=0;i<menu.length;i++){
        menu[i].classList.toggle("visible");
    }

})

//AJOUTER PANIER
function ajouterPanier(produit){
    const container=document.querySelector("#receipt");
    container.innerHTML="";
    const titre=document.createElement('h4');
    titre.innerText="Le produit a été ajouté au panier";
    container.appendChild(titre);
    const content=document.createElement("section");
    container.appendChild(content);
    const receipt=document.createElement('div');
    receipt.classList="receipt";
    const photo=document.createElement("img");
    photo.src=produit.image;
    receipt.appendChild(photo);
    const informations=document.createElement("div");
    informations.classList="facture";
    const nom=document.createElement("p");
    nom.innerText="Nom: " + produit.name;
    informations.appendChild(nom);
    const quantity=document.createElement("p");
    const qte=document.querySelector(".subQuantity");
    quantity.innerText="Quantité: "+ qte.value
    informations.appendChild(quantity);
    const taille=document.createElement('p');
    taille.innerText="Taille: " ;
    informations.appendChild(taille);
    const pu=document.createElement("p");
    pu.innerText="PU: "+ produit.price;
    informations.appendChild(pu);
    const total=document.createElement("h3");
    total.innerText="Total: "+ produit.price*qte.value;
    informations.appendChild(total);
    const bouton=document.createElement("button");
    bouton.innerText="Continuer vos achats";
    informations.appendChild(bouton);
    bouton.addEventListener('click',function(){
        container.style.display="none";
        document.querySelector(".page").classList.toggle("darkTheme");
    })
    content.appendChild(receipt);
    content.appendChild(informations);
    container.appendChild(content);
    container.style.display="flex";
    document.querySelector(".page").classList.add("darkTheme");
    document.querySelector('#nbreShopping').value= parseInt(document.querySelector('#nbreShopping').value)+1
    panier(produit,qte.value)
}
function panier(prod,qte)
{
    eraseContent(catalog);
    eraseContent(sectionDetails);
    const pagePanier=document.querySelector(".panier");
    const container=document.createElement("div");
    container.className="contentPanier";
    const image=document.createElement("img");
    image.src=prod.image;
    container.appendChild(image);
    const quantity=document.createElement('p');
    quantity.innerText=qte;
    container.appendChild(quantity);
    const total=document.createElement("p");
    total.innerText=prod.price*qte
    container.appendChild(total);
    const suppr=document.createElement("button")
    suppr.innerText="Annuler";
    container.appendChild(suppr);
    pagePanier.appendChild(container);
}
//RETOUR A LA PAGE D'ACCUEIL
document.querySelector('.home button').addEventListener('click',function(){
    eraseContent(catalog);
    eraseContent(sectionDetails);
        genererProduits(allProducts);
    console.log(catalog.innerHTML);
})
