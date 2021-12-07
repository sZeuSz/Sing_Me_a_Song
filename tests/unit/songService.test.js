/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* istanbul ignore else */
import * as songRepository from '../../src/repositories/songRepository.js';
import * as songService from '../../src/services/songService.js';

describe('POST /recommendations', () => {
  it('Insert Recommendations Sucess', async () => {
    jest.spyOn(songRepository, 'insertRecommendation').mockImplementationOnce(() => undefined);

    const name = 'juninho - rei delas';
    const youtubeLink = 'www.youtube.com/altigrantirson';

    const result = await songService.insertRecommendation(name, youtubeLink);
    expect(result).toBe(undefined);
  });
});

describe('POST /recommendations/:id/upvot', () => {
  it('Up vote in song recommendations sucess', async () => {
    jest.spyOn(songRepository, 'upVoteRecommendationSongById').mockImplementationOnce(() => true);
    const result = await songService.upVoteRecommendationSongById(12);

    expect(result).toBe(true);
  });

  it('Up vote in song recommendations failed because id not exist', async () => {
    jest.spyOn(songRepository, 'upVoteRecommendationSongById').mockImplementationOnce(() => false);
    const result = await songService.upVoteRecommendationSongById(99999999);

    expect(result).toBe(false);
  });
});

describe('POST /recommendations/:id/downvote', () => {
  it('Down vote in song recommendations sucess', async () => {
    jest.spyOn(songRepository, 'getScoreById').mockImplementationOnce(() => -4);
    jest.spyOn(songRepository, 'downVoteRecommendationSongById').mockImplementationOnce(() => 1);
    jest.spyOn(songRepository, 'deleteRecommendationSongByID').mockImplementationOnce(() => 1);

    const result = await songService.downVoteRecommendationSongById(1);

    expect(result).toBe(true);
  });

  it('Down vote in song recommendations failed because id not exist', async () => {
    jest.spyOn(songRepository, 'getScoreById').mockImplementationOnce(() => 0);
    jest.spyOn(songRepository, 'downVoteRecommendationSongById').mockImplementationOnce(() => 0);
    jest.spyOn(songRepository, 'deleteRecommendationSongByID').mockImplementationOnce(() => 0);
    const result = Boolean(await songService.downVoteRecommendationSongById(1));

    expect(result).toBe(false);
  });

  it('Down vote in song recommendations sucess when score greater -5', async () => {
    jest.spyOn(songRepository, 'getScoreById').mockImplementationOnce(() => -4);
    jest.spyOn(songRepository, 'deleteRecommendationSongByID').mockImplementationOnce(() => 0);
    jest.spyOn(songRepository, 'downVoteRecommendationSongById').mockImplementationOnce(() => 1);

    const result = await songService.downVoteRecommendationSongById(1);
    expect(result).toBe(false);
  });

  it('Down vote in song recommendations sucess but less -5', async () => {
    jest.spyOn(songRepository, 'getScoreById').mockImplementationOnce(() => -5);
    jest.spyOn(songRepository, 'deleteRecommendationSongByID').mockImplementationOnce(() => 1);
    jest.spyOn(songRepository, 'downVoteRecommendationSongById').mockImplementationOnce(() => 1);

    const result = await songService.downVoteRecommendationSongById(1);
    expect(result).toBe(true);
  });
});

describe('GET /recommendations/random', () => {
  it('get a random recommendations list only exist Between scores musics', async () => {
    jest.spyOn(songRepository, 'getAboveRecommendation').mockImplementationOnce(() => false);
    jest.spyOn(songRepository, 'getBetweenRecommendation').mockImplementationOnce(() => true);
    jest.spyOn(songRepository, 'getRecommendationRandomlyBetween').mockImplementationOnce(() => [
      {
        id: 1,
        name: 'Juninho - rei delas',
        youtubeLink: 'www.youtube.com/reidelasJ',
        score: -2,
      },
    ]);
    jest.spyOn(songRepository, 'getRecommendationsRandomlyAbove').mockImplementationOnce(() => [
      {
        id: 1,
        name: 'Juninho - rei delas acustico',
        youtubeLink: 'www.youtube.com/reidelasJ',
        score: 11,
      },
    ]);
    jest.spyOn(songRepository, 'getRecommendationRandomly').mockImplementationOnce(() => [
      {
        id: 1,
        name: 'Juninho - rei delas',
        youtubeLink: 'www.youtube.com/reidelasJ',
        score: -2,
      },
    ]);

    const result = await songService.getRecommendationRandomly();

    expect(result).toEqual([{
      id: 1,
      name: 'Juninho - rei delas',
      youtubeLink: 'www.youtube.com/reidelasJ',
      score: -2,
    }]);
  });

  it('get a random recommendations list only exist above scores musics', async () => {
    jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 0.6);

    jest.spyOn(songRepository, 'getAboveRecommendation').mockImplementationOnce(() => true);
    jest.spyOn(songRepository, 'getBetweenRecommendation').mockImplementationOnce(() => false);
    jest.spyOn(songRepository, 'getRecommendationRandomlyBetween').mockImplementationOnce(() => [
      {
        id: 1,
        name: 'Juninho - rei delas',
        youtubeLink: 'www.youtube.com/reidelasJ',
        score: -2,
      },
    ]);
    jest.spyOn(songRepository, 'getRecommendationsRandomlyAbove').mockImplementationOnce(() => [
      {
        id: 1,
        name: 'Juninho - rei delas',
        youtubeLink: 'www.youtube.com/reidelasJ',
        score: -2,
      },
    ]);
    jest.spyOn(songRepository, 'getRecommendationRandomly').mockImplementationOnce(() => [
      {
        id: 1,
        name: 'Juninho - rei delas',
        youtubeLink: 'www.youtube.com/reidelasJ',
        score: 22,
      },
    ]);

    const result = await songService.getRecommendationRandomly();

    expect(result).toEqual([{
      id: 1,
      name: 'Juninho - rei delas',
      youtubeLink: 'www.youtube.com/reidelasJ',
      score: 22,
    }]);
  });

  it('get a random recommendations failed because not have recommendations registred', async () => {
    jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 0.6);
    jest.spyOn(songRepository, 'getAboveRecommendation').mockImplementationOnce(() => false);
    jest.spyOn(songRepository, 'getRecommendationRandomlyBetween').mockImplementationOnce(() => [
      {
        id: 1,
        name: 'Juninho - rei delas',
        youtubeLink: 'www.youtube.com/reidelasJ',
        score: -2,
      },
    ]);
    jest.spyOn(songRepository, 'getRecommendationsRandomlyAbove').mockImplementationOnce(() => [
      {
        id: 1,
        name: 'Juninho - rei delas',
        youtubeLink: 'www.youtube.com/reidelasJ',
        score: -2,
      },
    ]);
    jest.spyOn(songRepository, 'getBetweenRecommendation').mockImplementationOnce(() => false);

    const result = await songService.getRecommendationRandomly();

    expect(result).toBe(null);
  });

  it('get a random recommendations by percentage until 70%', async () => {
    jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 0.7);
    jest.spyOn(songRepository, 'getAboveRecommendation').mockImplementationOnce(() => true);
    jest.spyOn(songRepository, 'getBetweenRecommendation').mockImplementationOnce(() => true);
    jest.spyOn(songRepository, 'getRecommendationsRandomlyAbove').mockImplementationOnce(() => [
      {
        id: 1,
        name: 'Juninho - rei delas acustico',
        youtubeLink: 'www.youtube.com/reidelasJ',
        score: 11,
      },
    ]);
    jest.spyOn(songRepository, 'getRecommendationRandomlyBetween').mockImplementationOnce(() => [
      {
        id: 2,
        name: 'Juninho - rei delas acustico',
        youtubeLink: 'www.youtube.com/reidelasJacustico',
        score: -2,
      },
    ]);
    const result = await songService.getRecommendationRandomly();

    expect(result).toEqual([
      {
        id: 1,
        name: 'Juninho - rei delas acustico',
        youtubeLink: 'www.youtube.com/reidelasJ',
        score: 11,
      },
    ]);
  });
  it('get a random recommendations by percentage until 69%', async () => {
    jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 0.69);
    jest.spyOn(songRepository, 'getAboveRecommendation').mockImplementationOnce(() => true);
    jest.spyOn(songRepository, 'getBetweenRecommendation').mockImplementationOnce(() => true);
    jest.spyOn(songRepository, 'getRecommendationRandomlyBetween').mockImplementationOnce(() => [
      {
        id: 1,
        name: 'Juninho - rei delas',
        youtubeLink: 'www.youtube.com/reidelasJ',
        score: -2,
      },
    ]);
    jest.spyOn(songRepository, 'getRecommendationsRandomlyAbove').mockImplementationOnce(() => [
      {
        id: 3,
        name: 'Juninho - rei delas',
        youtubeLink: 'www.youtube.com/reidelasJ',
        score: 11,
      },
    ]);
    const result = await songService.getRecommendationRandomly();

    expect(result).toEqual([
      {
        id: 1,
        name: 'Juninho - rei delas',
        youtubeLink: 'www.youtube.com/reidelasJ',
        score: -2,
      },
    ]);
  });

  it('get a random recommendations by percentage until 71%', async () => {
    jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 0.71);
    jest.spyOn(songRepository, 'getAboveRecommendation').mockImplementationOnce(() => true);
    jest.spyOn(songRepository, 'getBetweenRecommendation').mockImplementationOnce(() => true);
    jest.spyOn(songRepository, 'getRecommendationRandomlyBetween').mockImplementationOnce(() => [
      {
        id: 1,
        name: 'Juninho - rei delas',
        youtubeLink: 'www.youtube.com/reidelasJ',
        score: -2,
      },
    ]);
    jest.spyOn(songRepository, 'getRecommendationsRandomlyAbove').mockImplementationOnce(() => [
      {
        id: 1,
        name: 'Juninho - rei delas',
        youtubeLink: 'www.youtube.com/reidelasJ',
        score: 11,
      },
    ]);
    const result = await songService.getRecommendationRandomly();

    expect(result).toEqual([
      {
        id: 1,
        name: 'Juninho - rei delas',
        youtubeLink: 'www.youtube.com/reidelasJ',
        score: -2,
      },
    ]);
  });
});

describe('GET /recommendatons/top/:amount', () => {
  it('list recommendations by limit parameter (amount)', async () => {
    jest.spyOn(songRepository, 'getRecommendationsAmount').mockImplementationOnce(() => 333);
    jest.spyOn(songRepository, 'getRecommendationTop').mockImplementationOnce(() => [

      {
        id: 2,
        name: 'Juninho - rei delas acustico',
        youtubeLink: 'www.youtube.com/reidelasJacustico',
        score: 12,
      },
      {
        id: 4,
        name: 'Juninho - é por isso que eu programo',
        youtubeLink: 'www.youtube.com/juninProgamoPorIsso',
        score: 44,
      },
    ]);
    const result = await songService.recommendationTop(2);
    expect(result).toEqual([

      {
        id: 2,
        name: 'Juninho - rei delas acustico',
        youtubeLink: 'www.youtube.com/reidelasJacustico',
        score: 12,
      },
      {
        id: 4,
        name: 'Juninho - é por isso que eu programo',
        youtubeLink: 'www.youtube.com/juninProgamoPorIsso',
        score: 44,
      },
    ]);
  });
});

describe('function getRecommendationsAmount', () => {
  jest.spyOn(songRepository, 'getRecommendationsAmount').mockImplementationOnce(() => 5);

  it('return number diff zero', async () => {
    const result = await songService.getRecommendationsAmount();
    expect(result).toEqual(5);
  });
});

describe('function getRecommendationRandomlyBetween', () => {

});

describe('function deleteRecommendationSongByID', () => {
  it('return number diff zero', async () => {
    jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 1);
    jest.spyOn(songRepository, 'deleteRecommendationSongByID').mockImplementationOnce(() => 1);
    jest.spyOn(songRepository, 'getAboveRecommendation').mockImplementationOnce(() => true);
    jest.spyOn(songRepository, 'getBetweenRecommendation').mockImplementationOnce(() => true);
    jest.spyOn(songRepository, 'getScoreById').mockImplementationOnce(() => 22);
    jest.spyOn(songRepository, 'getRecommendationRandomlyBetween').mockImplementationOnce(() => [
      {
        id: 1,
        name: 'Juninho - rei delas',
        youtubeLink: 'www.youtube.com/reidelasJ',
        score: -2,
      },
    ]);
    jest.spyOn(songRepository, 'getRecommendationsRandomlyAbove').mockImplementationOnce(() => [
      {
        id: 1,
        name: 'Juninho - rei delas',
        youtubeLink: 'www.youtube.com/reidelasJ',
        score: 11,
      },
    ]); const result = await songService.downVoteRecommendationSongById(32);

    expect(result).toEqual(true);
  });
});
