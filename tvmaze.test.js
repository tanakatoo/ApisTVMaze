describe('test shows', function (){
    it('test shows api', function () {
        const answer = [{
            id: 1767,
            image: {
                medium: "https://static.tvmaze.com/uploads/images/medium_portrait/147/369403.jpg",
                original: "https://static.tvmaze.com/uploads/images/original_untouched/147/369403.jpg"
            },
            name: "The Bletchley Circle",
            summary: "<p><b>The Bletchley Circle</b> follows the journey of four ordinary women with extraordinary skills that helped to end World War II.Set in 1952, Susan, Millie, Lucy and Jean have returned to their normal lives, modestly setting aside the part they played in producing crucial intelligence, which helped the Allies to victory and shortened the war.When Susan discovers a hidden code behind an unsolved murder she is met by skepticism from the police.She quickly realises she can only begin to crack the murders and bring the culprit to justice with her former friends.</p>"
        }, {
            id: 37008,
            image: {medium
                : 
                "https://static.tvmaze.com/uploads/images/medium_portrait/160/401704.jpg",
                original
                : 
                    "https://static.tvmaze.com/uploads/images/original_untouched/160/401704.jpg"
            },
            name: "The Bletchley Circle: San Francisco",
            summary: "<p>Set during the thrilling social change of the mid-1950s, <b>The Bletchley Circle: San Francisco</b> captures the lives of four remarkable women gifted with extraordinary intelligence, breathtaking capacity for pattern recognition, and a genius for decryption. Years after secretly serving during WWII as code-breakers tasked with penetrating the Axis Powers' secret communications, they turn their skills to solving murders overlooked by police. In the process they are plunged into fascinating corners of the city, forge powerful relationships, and rediscover their own powers and potential. Our women achieve justice not only for the victims, but also for themselves as they carve out new lives in the wider world.</p>"
            }]
        expect(getShowsByTerm('bletchley')).toEqual(answer);
    })
})
